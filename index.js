define('x-resolver/resolver', ['exports', 'ember/resolver'],
	 function (exports, Resolver) {

	  'use strict';
  
	  var XResolver = Resolver["default"].extend({
      
      
	    moduleNameLookupPatterns: Ember.computed(function () {
	        var arr = this._super();
	        arr.unshift(this.handleDotPodFormatFactory(false, false));
	        arr.unshift(this.handleDotPodFormatFactory(true, false));
	        arr.unshift(this.handleDotPodFormatFactory(false, true));
	        arr.unshift(this.handleDotPodFormatFactory(true, true));
	        return arr;
	    }),

        handleDotPodFormatFactory: function(prependTypeAsPath, dotFormat) {
            
            return function (parsedName) {

                var podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;

                var fullNameWithoutType = parsedName.fullNameWithoutType,
                    parts = fullNameWithoutType.split('/'),
                    isPartial = parsedName.type === "template" && parts.length > 0 && parts[parts.length-1].indexOf('-') === 0,
                    type = isPartial ? "partial":parsedName.type,
                    componentLookup = parts.length > 0 && parts[0] === "components";

                if (parsedName.type === 'component') {
                    
                    parts.unshift('components');

                }
                
                if (prependTypeAsPath && parts.length > 1) {
                    
                    parts.splice(parts.length-1, 0, this.pluralize(type));
                    
                }
                
                if (dotFormat && parts.length > 1) {
                    
                    parts[parts.length-1] = type + "." + parts[parts.length-1].replace(/^\-/, '');
                    
                }
                return podPrefix + '/' + parts.join('/');

            };
            
        }
  
	});
	
	exports['default'] = XResolver;

});