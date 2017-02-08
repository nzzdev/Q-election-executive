const fs = require('fs');
const Enjoi = require('enjoi');
const Joi = require('joi');
const _ = require('lodash');
const resourcesDir = __dirname + '/../../resources/';
const viewsDir = __dirname + '/../../views/';

const schemaString = JSON.parse(fs.readFileSync(resourcesDir + 'schema.json', {
	encoding: 'utf-8'
}));
const schema = Enjoi(schemaString);

require('svelte/ssr/register');
const staticTemplate = require(viewsDir + 'html-static.html');

module.exports = {
	method: 'POST',
	path: '/rendering-info/html-static',
	config: {
		validate: {
			payload: {
				item: schema,
        toolRuntimeConfig: Joi.object()
			}
		}
	},
	handler: function(request, reply) {
    let isSophieVizColorDefined = false;
    let candidates = request.payload.item.candidates;
    if (candidates !== undefined) {
      candidates.forEach(candidate => {
        let vizPattern = /^s-viz.*/;
        if (_.has(candidate, 'color.full.classAttribute') && vizPattern.test(candidate.color.full.classAttribute)) {
          isSophieVizColorDefined = true;
        } else if (_.has(candidate, 'color.light.classAttribute') && vizPattern.test(candidate.color.light.classAttribute)) {
          isSophieVizColorDefined = true;
        }
      })
    }

		let data = {
			stylesheets: [
				{
					name: 'default',
					type: 'critical'
				}
			],
			markup: staticTemplate.render(request.payload.item)
		}
    if (isSophieVizColorDefined) {
      data.stylesheets.push({
        url: 'https://service.sophie.nzz.ch/bundle/sophie-viz-color@^1.0.0.css',
        type: 'critical'
      });
    }

		return reply(data);
	}
}
