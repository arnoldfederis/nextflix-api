import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Movies, MoviesRelations } from '../models';
import { resolve } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

export class MoviesRepository extends DefaultCrudRepository<
  Movies,
  typeof Movies.prototype.id,
  MoviesRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Movies, dataSource);
  }

  public async migrate() {
    console.log('Migrating Movies...');

    const moviesPath = resolve('src/datasources/movies');
    const moviesJson = readdirSync(moviesPath);

    if (!moviesJson) {
      console.log('No movies found');
      return;
    }

    for (const movie of moviesJson) {
      console.log(`Migrating file ${movie}`);
      const movieFile = resolve(`src/datasources/movies/${movie}`);
      const category = movie.replace('.json', '');
      const movies = JSON.parse(readFileSync(movieFile, 'utf8'));

      if (movies.length === 0) {
        console.log('No movies found');
        return;
      }

      movies.map(async (movie: Movies | any) => {
        if (movie.release_date) {
          movie.release_date = new Date(movie.release_date);
        } else if (movie.first_air_date) {
          movie.release_date = new Date(movie.first_air_date);
          delete movie.first_air_date;
        } else {
          movie.release_date = new Date();
        }

        if (movie.name) {
          movie.title = movie.name;
          movie.original_title = movie.name;
          delete movie.name;
        }

        if (movie.original_name) {
          movie.title = movie.original_name;
          movie.original_title = movie.original_name;
          delete movie.original_name;
        }

        if (!movie.backdrop_path) {
          movie.backdrop_path = movie.poster_path;
        }

        movie.category = category;

        console.log(`Migrating movie ${movie.title}`);

        console.log(`Removing content in file ${movieFile}`);
        writeFileSync(movieFile, JSON.stringify([]));
        await this.create(movie);
      });
    }

    console.log('Migration complete');
  }
}
