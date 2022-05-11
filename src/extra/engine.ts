/**
 * Registered template helpers
 */
let _helpers: Record<string, Function> = {}

/**
 * Register a template helper
 * @param key
 * @param callback
 */
function helper(key: string, callback?: Function) {
    _helpers[key] = callback
}

/**
 * Cleans one line
 * @param line
 * @returns
 */
function clean(line: string) {
    return line
        .replace(/\s+/g, ' ') // Remove double space
        .replace(/^{{\s?/, '') // Remove starting tag
        .replace(/\s?}}$/, '') // Remove ending tag
}

/**
 * Parse conditions in one line
 * @param line
 * @returns
 */
function parseConditions(line: string) {
    return line
        .replace(/^if\s?(.*)$/, 'if( $1 ){') // if condition
        .replace(/^elseif\s?(.*)$/, '}else if( $1 ){') // else if condition
        .replace(/^else$/, '}else{') // else condition
        .replace(/^end$/, '}') // Close end if/for/each
}

/**
 * Parse loops in one line
 * @param line
 * @returns
 */
function parseLoops(line: string) {
    return line
        .replace(/^for\s?(.*)\sin\s(.*)$/, 'for( var $1 in $2 ){') // for condition
        .replace(/^each\s?(.*)\s?=>\s?(.*)\sin\s(.*)$/, 'for( var $1 in $3 ){ var $2 = $3[$1];') // each condition
        .replace(/^each\s?(.*)\sin\s(.*)$/, 'for( var _$1 in $2 ){ var $1 = $2[_$1];') // each condition
}

/**
 * Find variables in one line
 * @param line
 * @returns
 */
function findVariables(line: string) {

    const vars: Array<string> = []
    const add = (regex: RegExp) => {
        const match = line.match(regex)
        if (match) {
            vars.push(match[1])
        }
    }

    if (line.match(/^(}|for\(|if\()/) === null) {
        add(/^([A-Za-z0-9_]+)/) // Single var
    }

    add(/^if\(\s?!?([A-Za-z0-9_]+)/) // If vars
    add(/^}else\sif\(\s?!?([A-Za-z0-9_]+)/) // Else if vars
    add(/&&\s?!?([A-Za-z0-9_]+)/) // && condition vars
    add(/\|\|\s?!?([A-Za-z0-9_]+)/) // || condition vars
    add(/in\s([A-Za-z0-9_]+)\s\)/) // For vars

    return vars
}

/**
 * Parse a template with custom data.
 * Template patterns:
 *
 * {{ VARIABLE }} - simple variable
 *
 * {{ if VARIABLE }} - if condition
 * {{ elseif VARIABLE }} - else if condition (requires if)
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
 * @returns
 */
function parse(template: string, data?: Object) {

    let tagRegex = /{{([^}}]+)?}}/g
    let parser = []
    let cursor = 0
    let line = ''
    let before = ''
    let after = ''
    let match: RegExpExecArray | null

    data = {
        ..._helpers,
        ...(data || {})
    }

    const keys = Object.keys(data)
    for (const key of keys) {
        parser.push('var ' + key + ' = this["' + key + '"];')
    }

    parser.push('var r = [];')

    while ((match = tagRegex.exec(template))) {

        line = clean(match[0])
        line = parseConditions(line)
        line = parseLoops(line)

        before = template.slice(cursor, match.index)
        cursor = match.index + match[0].length
        parser.push('r.push(`' + before.replace(/"/g, '\\"') + '`);')

        findVariables(line).filter((value) => {
            if (data[value] === undefined) {
                parser.push('var ' + value + ';')
            }
        })

        parser.push(line.match(/^(}|{|for\(|if\()/) ? line : 'r.push(' + line + ');')

    }

    after = template.substring(cursor, cursor + (template.length - cursor))
    parser.push('r.push(`' + after.replace(/"/g, '\\"') + '`);')
    parser.push('return r.join("");')

    const code = parser.join("\n")
    const result = new Function(code.replace(/[\r\t\n]/g, '')).apply(data || {})

    return result as string
}

export const Engine = {
    helper,
    parse
}
