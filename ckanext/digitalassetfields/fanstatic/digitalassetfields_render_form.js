"use strict";

function urlExists(url, callback){
  $.ajax({
    type: 'HEAD',
    url: url,
    success: function(){
      callback(true);
    },
    error: function() {
      callback(false);
    }
  });
}

ckan.module('digitalassetfields_render_form', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);
      //find the label associated
      //const cg = $(this.el).closest('div.control-group');
      //console.log(cg);
      //const cgLabel = cg.find('label.control-label');
      //console.log(cgLabel);

      //if(this.options.hasOwnProperty('tooltip')) {
      //   console.log('Tooltip: ' + this.options.tooltip);
      //}

      //cgLabel.popover({title: 'Info', html: true,
      //                 content: this._(this.options.tooltip), trigger: 'hover', placement: 'left'});

    }
  };
});

ckan.module('digitalassetfields_render_proj', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);
      const currElem = this.el;
      const currElemVal = $(this.el[0]).text();
      console.log(currElemVal);

      //split comma tokens
      const arrProj = currElemVal.split(",");
      var pMap = {};
      var promises = [];

      const web = "https://network.csiro.au/project";
      $.when.apply($, arrProj.map(function(item) {
         const api = "https://network.csiro.au/api/standalone/projects.json";
         const param = { 'wbscode' : item};
         return $.getJSON( api, param).then(function( data ) {
            console.log(data);
            const proj_name = data.result.items[0].name;
            const proj_id = data.result.items[0]._about;
            pMap[proj_id] = { 
		    'id': item,
		    'name': proj_name
	    };
            //currElem.html("<a href='" +  web + "?id=" + proj_id + "' target='out'>" + proj_name + "</a>");
         });
      })).then(function() {
         console.log("Proj getJSON promises all done!");
         console.log(pMap);
         var pArr = [];
         $.each(pMap, function(key, val) {
            pArr.push( val.name + " (" + val.id + ") <a href='" +  web + "?id=" + key + "' target='out'><i class='fa fa-external-link'></i></a>");
         });
         currElem.html(pArr.join(', '));
      });


    }
  };
});

ckan.module('digitalassetfields_render_person', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);
      const currElem = this.el;
      const currElemVal = $(this.el[0]).text();
      console.log(currElemVal);

      //split comma tokens
      const arrPerson = currElemVal.split(",");
      var personMap = {};
      var promises = [];

      const web = "https://network.csiro.au/person";
      $.when.apply($, arrPerson.map(function(item) {
         const api = "https://network.csiro.au/api/standalone/id/csiro/affiliation/" + item.toUpperCase() + ".json";
         const param = {};
         return $.getJSON( api, param).then(function( data ) {
            console.log(data);
            const p_name = data.result.items[0].affiliate.hasName.firstName + " " +  data.result.items[0].affiliate.hasName.lastName;
            const p_id = data.result.items[0].affiliate._about;
           personMap[p_name] = {
		   'username' : item,
		   'uri' : p_id
	   }
         },
         function(err) {
           console.log("Error in getJSON");
           console.log(api);
           personMap[item] = '';
           
         }
      );
      })).then(function() {
         console.log("Person getJSON promises all done!");
         console.log(personMap);
         var personArr = [];
         $.each(personMap, function(key, val) {
            if(val != '') {
               personArr.push("<a href='/user/" +  val.username + "'>" + key+ "</a> <a href='" +  web + "?id=" + val.uri + "' target='out'><i class='fa fa-external-link'></i></a>");
            }
            else {
               personArr.push(key);
            }
         });
         currElem.html(personArr.join(', '));
        // currElem.html("<a href='" +  web + "?id=" + p_id + "' target='out'>" + p_name + "</a>");
      }, function(err) {
         console.log("Person getJSON err caught in .then()!");
         console.log(err);
         console.log(personMap);
         var personArr = [];
         $.each(personMap, function(key, val) {
            if(val != '') {
               personArr.push("<a href='" +  web + "?id=" + val + "' target='out'>" + key+ "</a>");
            }
            else {
               personArr.push(key);
            }
         });
         currElem.html(personArr.join(', '));
      });

    }
  };
});

ckan.module('digitalassetfields_render_pub', function ($) {
  return {
    initialize: function () {
      console.log("I've been initialized for element: ", this.el);
      const currElem = this.el;
      const currElemVal = $(this.el[0]).text();
      console.log(currElemVal);

      //split comma tokens
      const arrProj = currElemVal.split(",");
      var pMap = {};
      var promises = [];

      const web = "https://network.csiro.au/publication";
      $.when.apply($, arrProj.map(function(item) {
         const api = "https://network.csiro.au/api/standalone/publication.json";
         const param = { 'resource' : item};
         return $.getJSON( api, param).then(function( data ) {
            console.log(data);
            const p_name = data.result.primaryTopic.title;
            pMap[item] = p_name;
         });
      })).then(function() {
         console.log("Pub getJSON promises all done!");
         console.log(pMap);
         var pArr = [];
         $.each(pMap, function(key, val) {
            pArr.push(val + " <a href='" +  web + "?id=" + key + "' target='out'><i class='fa fa-external-link'></i></a>");
         });
         currElem.html(pArr.join(', '));
      });

    }
  };
});

