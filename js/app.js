var app = {};

app.init = function () {
    this.configRequireJS();
    this.setPrototypes();
}

app.configRequireJS = function () {
    require.config({
        paths: {
            'jquery': app.path.lib('jquery'),
            'jqueryui': app.path.lib('jquery-ui'),
            'angular': app.path.lib('angular'),
            'underscore': app.path.lib('underscore'),
            'backbone': app.path.lib('backbone')
        },
        shim: {
            'jquery': { exports: '$' },
            'jqueryui': { deps: ['jquery'] },
            'angular': { exports: 'angular' },
            'underscore': { exports: '_' },
            'backbone': { exports: 'Backbone' }
        }
    })
}

app.setPrototypes = function () {
    String.prototype.trim = function() { this.replace( /^\s+|\s+$/g, '') }
    String.prototype.contains = function(value) { return this.indexOf(value) > -1; }
    String.prototype.replaceAll = function(target, replacement) { return this.replace(new RegExp(target, "g"), replacement); };
    String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase(); };

    Array.prototype.contains = function(element) {
        var i = this.length;
        while (i--) {
            if (this[i] === element) {
                return true;
            }
        }
        return false;
    };
    Array.prototype.clear = function() { this.length = 0; };
}

app.path = {
    module: function (name) {
        return 'js/modules/'+name;
    },
    boot: function (name) {
        return 'js/boots/boot-'+name
    },
    lib: function (name) {
        return 'js/libs/'+name
    }
}

app.Form = {
    Field: function(data) {
        var defaultStatus = 'ok';
        for (d in data) { this[d] = data[d]; }
        this.feedback = {
            status: defaultStatus,
            errors: []
        }

        this.hasError = function (error) {
            if (!error) return this.feedback.status=='error' ? true : false;
            else                return this.feedback.errors.indexOf(error)==-1 ? false : true;
        }
        this.getStatus = function () {
            return this.feedback.status;
        }
        this.resetStatus = function () {
            this.feedback.errors = []; 
            this.feedback.status = defaultStatus;
            return this;
        }
        return this;
    },
    create: function (fields) {
        this.fields = {
            order: [],
            all: {}
        }
        this.feedback = {
            status: 'default',
            fields: {}
        }

        if (fields) {
            for (var f=0; f<fields.order.length; f++) {
                this.add({
                    name: fields.order[f],
                    data: fields.all[fields.order[f]]
                })
            }
        }

        return this;
    },

    add: function (field) {
        this.fields.order.push(field.name);
        this.fields.all[field.name] = new this.Field(field.data);
        return this;
    },

    checkout: function() {
        var flag = true;
        this.feedback.error = {fields: []};

        for (var k=0; k<this.fields.order.length; k++) {
            var f = this.fields.order[k];
            var field = this.fields.all[f];
            field.resetStatus();

            if (!field.valid) field.valid = [];

            for (var i=0; i<field.valid.length; i++) {
                if (!this.validator[field.valid[i]].check(field.value)) {
                    field.feedback.status = 'error';
                    field.feedback.errors.push(field.valid[i])
                    flag = false;
                }
            }
        }
        return flag;
    },

    getStatus: function () {
        for (f in this.fields.all) {
            if (this.fields.all[f].feedback.status=='error') return 'error';
        }
        return 'ok';
    },

    validator: {
        'notEmpty': {
            avert: 'Ce champs ne doit pas être vide',
            check: function (data) {
                return (!data || data=='') ? false : true;
            }
        },
        'email': {
            avert: 'Format email requis',
            check: function (data) {
                var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
                return (!reg.test(data) && data!='') ? false : true;
            }
        }
    }
}

app.util = {
    clone: function (srcInstance) {
        if(typeof(srcInstance) != 'object' || srcInstance == null) return srcInstance;
        var newInstance = srcInstance.constructor();
        for(var i in srcInstance) newInstance[i] = this.clone(srcInstance[i]);
        return newInstance;
    },
    isIE: function () {
        return '\v' == 'v';
    },
    readableNumberLimiter: function (number,limiter) {
      return number.toString().replace(
         new RegExp(
             "(^\\d{"+(number.toString().length%3||-1)+"})(?=\\d{3})"),
             "$1"+limiter
             ).replace(/(\d{3})(?=\d)/g,"$1"+limiter);
    },
    isArray: function (value) {
    return value &&
        typeof value === 'object' &&
        typeof value.length === 'number' &&
        typeof value.splice === 'function' &&
        !(value.propertyIsEnumerable('length'));
    }
}


app.init();