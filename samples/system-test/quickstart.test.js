/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const proxyquire = require(`proxyquire`).noPreserveCache();
const sinon = require(`sinon`);
const assert = require(`assert`);
const tools = require(`@google-cloud/nodejs-repo-tools`);

const {DNS} = proxyquire(`@google-cloud/dns`, {});
const dns = new DNS();

const uuid = require(`uuid`);
const zoneName = `test-${uuid().substring(0, 13)}`;

describe('QuickStart', () => {
  before(async () => {
    await dns.createZone(zoneName, {
      dnsName: `${process.env.GCLOUD_PROJECT}.appspot.com.`,
    });
  });

  after(async () => {
    try {
      await dns.zone(zoneName).delete();
    } catch (err) {} // ignore error
  });

  beforeEach(tools.stubConsole);
  afterEach(tools.restoreConsole);

  it(`should list zones`, done => {
    const dnsMock = {
      getZones: () => {
        return dns.getZones().then(([zones]) => {
          assert.ok(Array.isArray(zones));

          // Listing is eventually consistent, give the indexes time to update
          setTimeout(() => {
            try {
              assert.ok(console.log.called);
              assert.deepStrictEqual(console.log.getCall(0).args, [`Zones:`]);
              zones.forEach((zone, i) => {
                assert.deepStrictEqual(console.log.getCall(i + 1).args, [
                  zone.name,
                ]);
              });
              done();
            } catch (err) {
              done(err);
            }
          }, 200);

          return [zones];
        });
      },
    };

    setTimeout(() => {
      proxyquire(`../quickstart`, {
        '@google-cloud/dns': {
          DNS: sinon.stub().returns(dnsMock),
        },
      });
    }, 5000);
  });
});