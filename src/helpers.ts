import { existsSync } from 'fs';
import { Config } from './interfaces/config.interface';
import path from 'path';

/**
 * Get env value
 *
 * @param key Key of env
 * @param defaultValue Default value of env
 * @returns any
 */
export const env = (key: string, defaultValue?: any): any => {
  let value;

  ({ [key]: value } = require('dotenv').config().parsed);

  if (!value) {
    return defaultValue;
  }

  if (value.indexOf(',') > -1) {
    return value.split(',');
  }

  return value;
};

/**
 * Get config value inside of `src/configs` folder
 *
 * @param name Name of config file
 * @returns Config | undefined
 */
export const config = (name: string = 'app'): Config | undefined => {
  const configPath = path.resolve(__dirname, `../dist/configs/${name}.config`);

  if (!existsSync(`${configPath}.js`)) {
    return;
  }

  return require(configPath)?.default;
};

/**
 * Get the explorer theme file
 *
 * @param theme Theme of explorer, accepted values are (light|dark) by default is dark.
 * @returns string
 */
export const explorerFile = (theme: string = 'dark'): string => {
  return path.resolve(
    __dirname,
    `../src/resources/explorer/index-${theme}.html.ejs`
  );
};

/**
 * Convert string to slug
 *
 * @param str string
 * @param dasher string @default -
 * @returns string
 */
export const strSlug = (str: string, dasher: string = '-'): string => {
  str = str.replace(/(^\s+|\s+$)/g, '');

  // Make the string lowercase
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  let from =
    'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
  let to =
    'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // Remove invalid chars
  str = str
    .replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, dasher)
    // Collapse dashes
    .replace(/-+/g, dasher);

  return str;
};
