let passed = 0
let failed = 0

export function assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
        throw new Error(`${message}\nExpected: ${expected}\nActual: ${actual}`)
    }
}

export function assertDeepEqual(actual, expected, message = '') {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`)
    }
}

export function assertThrows(fn, errorClass, message = '') {
    try { fn() } 
    catch (err) {
        if (!(err instanceof errorClass)) {
            throw new Error(`${message}\nExpected ${errorClass.name}, got ${err.constructor.name}: ${err.message}`)
        } else { return }
    }
    throw new Error(`${message}\nExpected ${errorClass.name} to be thrown, but nothing was thrown`)
}

export async function assertRejects(fn, errorClass, message = '') {
    try { await fn() } 
    catch (err) {
        if (!(err instanceof errorClass)) {
            throw new Error(`${message}\nExpected ${errorClass.name}, got ${err.constructor.name}: ${err.message}`)
        } else { return }
    }
    throw new Error(`${message}\nExpected ${errorClass.name} to be thrown, but nothing was thrown`)
}

export async function describe(name, fn) {
    // console.log(`\n${name}`)
    try { await fn() } 
    catch (err) {
        console.error(`  ✗ Suite '${name}' failed: ${err.message}`)
        failed++
    }
}

export async function it(name, fn) {
    try {
        await fn()
        console.log(`  ✓ ${name}`)
        passed++
    } catch (err) {
        console.error(`  ✗ ${name}\n    ${err.message}`)
        failed++
    }
}

export function results() {
    console.log(`\n${passed} passed, ${failed} failed`)
    return failed === 0
}
