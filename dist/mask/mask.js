"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var DIGIT = '9';
var ALPHA = 'A';
var ALPHANUM = 'S';
var addPlaceholdersToOutput = function (output, index, placeholder) {
    for (; index < output.length; index++) {
        if (output[index] === DIGIT ||
            output[index] === ALPHA ||
            output[index] === ALPHANUM) {
            output[index] = placeholder;
        }
    }
    return output;
};
var toPattern = function (value, opts) {
    var pattern = typeof opts === 'object' ? opts.pattern : opts, patternChars = pattern.replace(/\W/g, ''), output = pattern.split(''), values = value.toString().replace(/\W/g, ''), charsValues = values.replace(/\W/g, ''), index = 0, i, outputLength = output.length, placeholder = typeof opts === 'object' ? opts.placeholder : undefined;
    for (i = 0; i < outputLength; i++) {
        // Reached the end of input
        if (index >= values.length) {
            if (patternChars.length == charsValues.length) {
                return output.join('');
            }
            else if (placeholder !== undefined &&
                patternChars.length > charsValues.length) {
                return addPlaceholdersToOutput(output, i, placeholder).join('');
            }
            else {
                break;
            }
        }
        // Remaining chars in input
        else {
            if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
                (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
                (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
                output[i] = values[index++];
            }
            else if (output[i] === DIGIT ||
                output[i] === ALPHA ||
                output[i] === ALPHANUM) {
                if (placeholder !== undefined) {
                    return addPlaceholdersToOutput(output, i, placeholder).join('');
                }
                else {
                    return output.slice(0, i).join('');
                }
                // exact match for a non-magic character
            }
            else if (output[i] === values[index]) {
                index++;
            }
        }
    }
    return output.join('').substr(0, i);
};
exports.UnMask = function (value) {
    return value.replace(/\W/g, '');
};
var masker = function (value, pattern, options) {
    return toPattern(value, __assign({ pattern: pattern }, options));
};
var multimasker = function (value, patterns, options) {
    return masker(value, patterns.reduce(function (memo, pattern) {
        return exports.UnMask(value).length <= exports.UnMask(memo).length ? memo : pattern;
    }, patterns[0]), options);
};
exports.Mask = function (value, pattern, options) {
    return typeof pattern === 'string'
        ? masker(value, pattern || '', options)
        : multimasker(value, pattern, options);
};
