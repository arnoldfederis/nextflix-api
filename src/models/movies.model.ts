import { model, property } from '@loopback/repository';
import { Model } from './model';

@model({
  name: 'movies',
})
export class Movies extends Model {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    default: '',
  })
  category?: string;

  @property({
    type: 'string',
    default: '',
  })
  media_type?: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  origin_country?: string[];

  @property({
    type: 'boolean',
    default: false,
  })
  adult?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  backdrop_path: string;

  @property({
    type: 'array',
    itemType: 'number',
    default: [],
  })
  genre_ids?: number[];

  @property({
    type: 'number',
    required: true,
  })
  original_id: number;

  @property({
    type: 'string',
    required: true,
  })
  original_language: string;

  @property({
    type: 'string',
    required: true,
  })
  original_title: string;

  @property({
    type: 'string',
    required: true,
  })
  overview: string;

  @property({
    type: 'number',
    default: 0,
  })
  popularity?: number;

  @property({
    type: 'string',
    required: true,
  })
  poster_path: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  release_date?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'boolean',
    default: false,
  })
  video?: boolean;

  @property({
    type: 'number',
    default: 0,
  })
  vote_average?: number;

  @property({
    type: 'number',
    default: 0,
  })
  vote_count?: number;

  constructor(data?: Partial<Movies>) {
    super(data);
  }
}

export interface MoviesRelations {
  // describe navigational properties here
}

export type MoviesWithRelations = Movies & MoviesRelations;
