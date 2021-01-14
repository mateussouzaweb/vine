import { each } from "./utils"

/**
 * Clean line
 * @param line
 */
function clean(line: string): string {
    return line
        .replace(/\s+/g, ' ') // Remove double space
        .replace(/^{{\s?/, '') // Remove starting tag
        .replace(/\s?}}$/, '') // Remove ending tag
}

/**
 * Parse conditions in line
 * @param line
 */
function conditions(line: string): string {
    return line
        .replace(/^if\s?(.*)$/, 'if( $1 ){') // if condition
        .replace(/^else$/, '} else {') // else condition
        .replace(/^end$/, '}') // Close end if/for/each
}

/**
 * Parse loops in line
 * @param line
 */
function loops(line: string): string {
    return line
        .replace(/^for\s?(.*)\sin\s(.*)$/, 'for( var $1 in $2 ){') // for condition
        .replace(/^each\s?(.*)\s?=>\s?(.*)\sin\s(.*)$/, 'for( var $1 in $3 ){ var $2 = $3[$1];') // each condition
        .replace(/^each\s?(.*)\sin\s(.*)$/, 'for( var _$1 in $2 ){ var $1 = $2[_$1];') // each condition
}

/**
 * Find variables in line
 * @param line
 */
function variables(line: string): Array<string> {

    var vars = []
    var add = function(regex: RegExp){
        var match = line.match(regex);
        if( match ){
            vars.push(match[1])
        }
    }

    add(/^(?!}|for\(|if\()([A-Za-z0-9_]+)/) // Single var
    add(/^if\(\s?!?([A-Za-z0-9_]+)/) // If vars
    add(/&&\s?!?([A-Za-z0-9_]+)/) // && condition vars
    add(/\|\|\s?!?([A-Za-z0-9_]+)/) // || condition vars
    add(/in\s([A-Za-z0-9_]+)\s\)/) // For vars

    return vars
}

/**
 * Parse a template with custom data
 * Template patterns:
 *
 * {{ VARIABLE }} - simple variable
 *
 * {{ if VARIABLE }} - if condition
 * {{ else }} - else condition (requires if)
 * {{ end }} - end if/else condition
 *
 * {{ for index in VARIABLE }}> - for loop
 *   {{ VARIABLE[index] }} - simple variable in loop
 * {{ end }} - end for loop
 *
 * {{ each key => item in VARIABLE }}> - each loop
 *   {{ key }} - {{ item }} - simple variable in loop
 * {{ end }} - end each loop
 *
 * {{ each item in VARIABLE }}> - each loop
 *   {{ item }} - simple variable in loop
 * {{ end }} - end each loop
 *
 * @param template
 * @param data
 */
export function template(template: string, data?: Object): string {

    var tagRegex = /{{([^}}]+)?}}/g
    var parser = []
    var cursor = 0
    var line = ''
    var before = ''
    var after = ''
    var match: RegExpExecArray | null

    data = data || {}
    each(data, function(_value, index){
        parser.push('var ' + index + ' = this["' + index + '"];')
    });

    parser.push('var r = [];')

    while( (match = tagRegex.exec(template)) ){

        line = clean(match[0])
        line = conditions(line)
        line = loops(line)

        before = template.slice(cursor, match.index)
        cursor = match.index + match[0].length
        parser.push('r.push(`' + before.replace(/"/g, '\\"') + '`);')

        variables(line).filter(function(value){
            if( data[value] === undefined ) {
                parser.push('var ' + value + ';')
            }
        })

        parser.push( line.match(/^(}|{|for\(|if\()/) ? line : 'r.push(' + line + ');')

    }

    after = template.substr(cursor, template.length - cursor)
    parser.push('r.push(`' + after.replace(/"/g, '\\"') + '`);')
    parser.push('return r.join("");')

    var code = parser.join("\n")
    var result = new Function(code.replace(/[\r\t\n]/g, '')).apply(data || {})

    return result
}