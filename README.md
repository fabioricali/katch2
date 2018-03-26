# iog
Save your logs on disk, so simply.
<br/><br/>
<a href="https://travis-ci.org/fabioricali/iog" target="_blank"><img src="https://travis-ci.org/fabioricali/iog.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>

## Installation
```
npm install --save iog
```

## Example
```javascript
const Iog = require('iog');

const logger = new Iog('my-module-name');

logger.write('my log info');
logger.write({
    also: {
        you: 'want, for example an object'
    }
});
```

## Log format

this produces
```javascript
logger.write('my log info');
```
this
```
CONTEXT: my-module-name
DATE: 2018-03-03 20:14:12:367
TYPE: log
BODY:

my log info

---------------------------------------------------------------------------------------
```

this produces
```javascript

let obj = {
    error: "undefine is not defined",
    other: {
        meta: "a meta"
    }
};

logger.write(obj);
```
this
```
CONTEXT: my-module-name
DATE: 2018-03-03 20:14:12:367
TYPE: log
BODY:

{
    "error": "undefine is not defined",
    "other": {
        "meta": "a meta"
    }
}

---------------------------------------------------------------------------------------
```

## API

<a name="Iog"></a>

## Iog
**Kind**: global class  

* [Iog](#Iog)
    * [new Iog(contextName, [opts])](#new_Iog_new)
    * [.pause()](#Iog+pause) ⇒ [<code>Iog</code>](#Iog)
    * [.resume()](#Iog+resume) ⇒ [<code>Iog</code>](#Iog)
    * [.write(msg, [type], [show])](#Iog+write)
    * [.error(msg)](#Iog+error)
    * [.warn(msg)](#Iog+warn)
    * [.info(msg)](#Iog+info)
    * [.trace(msg)](#Iog+trace)

<a name="new_Iog_new"></a>

### new Iog(contextName, [opts])
Iog instance

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>contextName</td><td><code>string</code></td><td></td><td><p>es. your-module-name</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>object</code></td><td></td><td><p>options</p>
</td>
    </tr><tr>
    <td>[opts.path=]</td><td><code>string</code></td><td></td><td><p>log path</p>
</td>
    </tr><tr>
    <td>[opts.logExt]</td><td><code>string</code></td><td><code>&quot;.log&quot;</code></td><td><p>log file extension</p>
</td>
    </tr><tr>
    <td>[opts.separator]</td><td><code>string</code></td><td><code>&quot;---&quot;</code></td><td><p>log separator</p>
</td>
    </tr><tr>
    <td>[opts.console]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>show log in console</p>
</td>
    </tr><tr>
    <td>[opts.rotation]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>actives rotation log by date</p>
</td>
    </tr><tr>
    <td>[opts.deleteAge]</td><td><code>number</code></td><td><code>0</code></td><td><p>delete old log in days, works only if <code>rotation</code> is true</p>
</td>
    </tr>  </tbody>
</table>

<a name="Iog+pause"></a>

### iog.pause() ⇒ [<code>Iog</code>](#Iog)
Pause log writing

**Kind**: instance method of [<code>Iog</code>](#Iog)  
<a name="Iog+resume"></a>

### iog.resume() ⇒ [<code>Iog</code>](#Iog)
Resume log writing

**Kind**: instance method of [<code>Iog</code>](#Iog)  
<a name="Iog+write"></a>

### iog.write(msg, [type], [show])
Write log

**Kind**: instance method of [<code>Iog</code>](#Iog)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>msg</td><td><code>string</code> | <code>object</code></td><td></td><td><p>message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message</p>
</td>
    </tr><tr>
    <td>[type]</td><td><code>string</code></td><td><code>&quot;log&quot;</code></td><td><p>any type that you want like: log, info, error, trace, warn also custom</p>
</td>
    </tr><tr>
    <td>[show]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>disable console for single write</p>
</td>
    </tr>  </tbody>
</table>

<a name="Iog+error"></a>

### iog.error(msg)
A wrapper of write that set type to "error"

**Kind**: instance method of [<code>Iog</code>](#Iog)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>msg</td><td><code>string</code> | <code>object</code></td><td><p>message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message</p>
</td>
    </tr>  </tbody>
</table>

<a name="Iog+warn"></a>

### iog.warn(msg)
A wrapper of write that set type to "warn"

**Kind**: instance method of [<code>Iog</code>](#Iog)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>msg</td><td><code>string</code> | <code>object</code></td><td><p>message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message</p>
</td>
    </tr>  </tbody>
</table>

<a name="Iog+info"></a>

### iog.info(msg)
A wrapper of write that set type to "info"

**Kind**: instance method of [<code>Iog</code>](#Iog)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>msg</td><td><code>string</code> | <code>object</code></td><td><p>message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message</p>
</td>
    </tr>  </tbody>
</table>

<a name="Iog+trace"></a>

### iog.trace(msg)
A wrapper of write that set type to "trace"

**Kind**: instance method of [<code>Iog</code>](#Iog)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>msg</td><td><code>string</code> | <code>object</code></td><td><p>message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message</p>
</td>
    </tr>  </tbody>
</table>


## License
Iog is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>