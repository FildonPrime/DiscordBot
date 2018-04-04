/**
 * @file Language Handler
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

/* eslint-disable no-sync */
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const color = require('chalk');

const locales = new Discord.Collection();


module.exports = class LanguageHandler {
  /**
   * @constructor
   */
  constructor() {
    this.locales = locales;
  }

  /**
   * Returns a list of languages supported by Bastion
   * @function getAvailableLanguages
   * @returns {Array} Array of languages supported by Bastion
   */
  get availableLanguages() {
    return languages;
  }

  /**
   * Returns the error message string for the given key.
   * @function error
   * @param {String} locale The locale of the string
   * @param {String} key The key of the string
   * @param {Boolean} description Whether to return the description or the title
   * @returns {String} The string mapped by the key and namespace
   */
  error(locale, key, description = false, ...vars) {
    if (!this.locales.has(locale)) {
      locale = 'en';
    }

    let namespace, regex = new RegExp(Object.keys(constants).join('|'), 'gi');
    if (description) {
      if (!this.locales.get(locale).errors['descriptions'][key]) {
        if (locale === 'en') {
          return `No string found for '${key}' in error descriptions.`;
        }
        return this.error('en', key, description, ...vars);
      }
      namespace = 'descriptions';
    }
    else {
      if (!this.locales.get(locale).errors['types'][key]) {
        if (locale === 'en') {
          return `No string found for '${key}' in error types.`;
        }
        return this.error('en', key);
      }
      namespace = 'types';
    }
    return this.locales.get(locale).errors[namespace][key].replace(regex, matched => constants[matched]).substitute(...vars);
  }

  /**
   * Returns the command description string for the given key.
   * @function command
   * @param {String} locale The locale of the string
   * @param {String} module The module that is mapped to the command
   * @param {String} command The command that is mapped to the string
   * @returns {String} The string mapped by the command and module
   */
  command(locale, module, command) {
    if (!this.locales.has(locale)) {
      locale = 'en';
    }

    if (!this.locales.get(locale).modules[module] || !this.locales.get(locale).modules[module][command]) {
      if (locale === 'en') {
        return `No string found for '${command}' command in ${module} module.`;
      }
      return command('en', module, command);
    }

    return this.locales.get(locale).modules[module][command];
  }
};
