/**
 * Parse a template with custom data
 * Template patterns:
 *
 * {{ VARIABLE }} - simple variable
 * {{ if VARIABLE }} - if condition
 * {{ else }} - else condition (requires if)
 * {{ end }} - end if/else condition
 * {{ for index in VARIABLE }}> - for loop
 *   {{ VARIABLE[index] }} - simple variable in loop
 * {{ end }} - end for loop
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

    parser.push('var r=[];')

    while( (match = tagRegex.exec(template)) ){

        line = match[0]
            .replace(/\s+/, ' ') // Remove double space
            .replace(/^{{\s?/, '') // Remove starting tag
            .replace(/\s?}}$/, '') // Remove ending tag
            .replace(/^else$/, '} else {') // Change else
            .replace(/^end$/, '}') // Close end if/for/each
            .replace(/^if\s?(.*)$/, 'if( this.$1 ){') // Change if condition
            .replace(/^for\s?(.*)\sin\s(.*)$/, 'for( var $1 in this.$2 ){') // Change for condition
            .replace(/^each\s?(.*)\sin\s(.*)$/, 'for( var _$1 in this.$2 ){ this.$1 = this.$2[_$1];') // Change each condition
            .replace(/^(?!}|{|for\(|if\()(.*)/, 'this.$1') // Change variable

        before = template.slice(cursor, match.index)
        cursor = match.index + match[0].length

        parser.push('r.push("' + before.replace(/"/g, '\\"') + '");')
        parser.push( line.match(/^(}|{|for\(|if\()/) ? line : 'r.push(' + line + ');')

    }

    after = template.substr(cursor, template.length - cursor)
    parser.push('r.push("' + after.replace(/"/g, '\\"') + '");')
    parser.push('return r.join("");')

    var code = parser.join('').replace(/[\r\t\n]/g, '')
    var result = new Function(code).apply(data || {})

    return result
}