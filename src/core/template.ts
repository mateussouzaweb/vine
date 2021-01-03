/**
 * Parse a template with custom data
 * Template patterns:
 *
 * {{ VARIABLE }} - simple variable
 * {{ if VARIABLE }} - if condition
 * {{ else }} - else condition (requires if)
 * {{ endif }} - end if/else condition
 * {{ for index in VARIABLE }}> - for loop
 *   {{ VARIABLE[index] }} - simple variable in loop
 * {{ endfor }} - end for loop
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
        .replace(/^endif$/, '}') // Close endif
        .replace(/^endfor$/, '}') // Close endfor
        .replace(/^if\s?(.*)$/, 'if( this.$1 ){') // Change if condition
        .replace(/^for\s?(.*)\sin\s(.*)$/, 'for( var $1 in this.$2 ){') // Change for condition
        .replace(/^(?!}|{|for\(|if\()(.*)/, 'this.$1') // Change variable

      before = template.slice(cursor, match.index)
      cursor = match.index + match[0].length

      parser.push('r.push("' + before.replace(/"/g, '\\\\"') + '");')
      parser.push( line.match(/^(}|{|for\(|if\()/) ? line : 'r.push(' + line + ');')

    }

    after = template.substr(cursor, template.length - cursor)
    parser.push('r.push("' + after.replace(/"/g, '\\\\"') + '");')
    parser.push('return r.join("");')

    var result = new Function(parser.join('')).apply(data || {})

    return result
}