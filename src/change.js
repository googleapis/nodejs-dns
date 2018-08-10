/*!
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {ServiceObject} = require('@google-cloud/common');
const {promisifyAll} = require('@google-cloud/promisify');
const util = require('util');

/**
 * @class
 *
 * @param {Zone} zone The parent zone object.
 * @param {string} id ID of the change.
 *
 * @example
 * const DNS = require('@google-cloud/dns');
 * const dns = new DNS();
 * const zone = dns.zone('zone-id');
 * const change = zone.change('change-id');
 */
function Change(zone, id) {
  const methods = {
    /**
     * @typedef {array} ChangeExistsResponse
     * @property {boolean} 0 Whether the {@link Change} exists.
     */
    /**
     * @callback ChangeExistsCallback
     * @param {?Error} err Request error, if any.
     * @param {boolean} exists Whether the {@link Change} exists.
     */
    /**
     * Check if the change exists.
     *
     * @method Change#exists
     * @param {ChangeExistsCallback} [callback] Callback function.
     * @returns {Promise<ChangeExistsResponse>}
     *
     * @example
     * const DNS = require('@google-cloud/dns');
     * const dns = new DNS();
     * const zone = dns.zone('zone-id');
     * const change = zone.change('change-id');
     *
     * change.exists(function(err, exists) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * change.exists().then(function(data) {
     *   const exists = data[0];
     * });
     */
    exists: true,

    /**
     * @typedef {array} GetChangeResponse
     * @property {Change} 0 The {@link Change}.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback GetChangeCallback
     * @param {?Error} err Request error, if any.
     * @param {Change} change The {@link Change}.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Get a change if it exists.
     *
     * You may optionally use this to "get or create" an object by providing an
     * object with `autoCreate` set to `true`. Any extra configuration that is
     * normally required for the `create` method must be contained within this
     * object as well.
     *
     * @method Change#get
     * @param {options} [options] Configuration object.
     * @param {boolean} [options.autoCreate=false] Automatically create the
     *     object if it does not exist.
     * @param {GetChangeCallback} [callback] Callback function.
     * @returns {Promise<GetChangeResponse>}
     *
     * @example
     * const DNS = require('@google-cloud/dns');
     * const dns = new DNS();
     * const zone = dns.zone('zone-id');
     * const change = zone.change('change-id');
     *
     * change.get(function(err, change, apiResponse) {
     *   // `change.metadata` has been populated.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * change.get().then(function(data) {
     *   const change = data[0];
     *   const apiResponse = data[1];
     * });
     */
    get: true,

    /**
     * @typedef {array} GetChangeMetadataResponse
     * @property {object} 0 The {@link Change} metadata.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback GetChangeMetadataCallback
     * @param {?Error} err Request error, if any.
     * @param {object} metadata The {@link Change} metadata.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Get the metadata for the change in the zone.
     *
     * @see [Changes: get API Documentation]{@link https://cloud.google.com/dns/api/v1/changes/get}
     *
     * @method Change#getMetadata
     * @param {GetChangeMetadataCallback} [callback] Callback function.
     * @returns {Promise<GetChangeMetadataResponse>}
     *
     * @example
     * const DNS = require('@google-cloud/dns');
     * const dns = new DNS();
     * const zone = dns.zone('zone-id');
     * const change = zone.change('change-id');
     *
     * change.getMetadata(function(err, metadata, apiResponse) {
     *   if (!err) {
     *     // metadata = {
     *     //   kind: 'dns#change',
     *     //   additions: [{...}],
     *     //   deletions: [{...}],
     *     //   startTime: '2015-07-21T14:40:06.056Z',
     *     //   id: '1',
     *     //   status: 'done'
     *     // }
     *   }
     * });
     *
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * change.getMetadata().then(function(data) {
     *   const metadata = data[0];
     *   const apiResponse = data[1];
     * });
     */
    getMetadata: true,
  };

  /**
   * @name Change#metadata
   * @type {object}
   */
  ServiceObject.call(this, {
    parent: zone,

    /**
     * @name Zone#baseUrl
     * @type {string}
     * @default "/changes"
     */
    baseUrl: '/changes',

    /**
     * @name Change#id
     * @type {string}
     */
    id: id,
    methods: methods,
  });
}

util.inherits(Change, ServiceObject);

/**
 * Create a change.
 *
 * @method Change#create
 * @param {CreateChangeRequest} config The configuration object.
 * @param {CreateChangeCallback} [callback] Callback function.
 * @returns {Promise<CreateChangeResponse>}
 *
 * @example
 * const DNS = require('@google-cloud/dns');
 * const dns = new DNS();
 * const zone = dns.zone('zone-id');
 * const change = zone.change('change-id');
 *
 * const config = {
 *   add: {
 *     // ...
 *   }
 * };
 *
 * change.create(config, function(err, change, apiResponse) {
 *   if (!err) {
 *     // The change was created successfully.
 *   }
 * });
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * change.create(config).then(function(data) {
 *   const change = data[0];
 *   const apiResponse = data[1];
 * });
 */
Change.prototype.create = function(config, callback) {
  const self = this;

  this.parent.createChange(config, function(err, change, apiResponse) {
    if (err) {
      callback(err, null, apiResponse);
      return;
    }

    self.id = change.id;
    self.metadata = change.metadata;

    callback(null, self, apiResponse);
  });
};

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Change);

module.exports = Change;
