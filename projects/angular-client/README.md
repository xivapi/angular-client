# angular-client

[![CircleCI](https://circleci.com/gh/xivapi/angular-client/tree/master.svg?style=shield)](https://circleci.com/gh/xivapi/angular-client/tree/master)
[![npm version](https://badge.fury.io/js/%40xivapi%2Fangular-client.svg)](https://www.npmjs.com/package/@xivapi/angular-client)

## Documentation

Visit https://xivapi.com/docs for documentation about the web api mapped by this client.

Further documentation for this library available on documentation website: https://xivapi.github.io/angular-client/

## Installation

Simply run `npm i --save @xivapi/angular-client`

## Quick start

Add `XivapiClientModule` to your `AppModule` imports:

```ts
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ...
        XivapiClientModule.forRoot(),        
        ...
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

In the other modules, don't call `forRoot` again, just import the module itself.

Then you can simply inject the service wherever you want to use it:

```ts
@Component({
    ...
})
export class FooComponent {
    
    public items$: Observable<XivapiList<any>>;
    
    constructor(private xivapi: XivapiService){
        this.items$ = this.xivapi.getList(XivapiEndpoint.Items);
    }
}
```

## Use with private_key (Google Cloud Function)

- Create a google cloud function, name it as you want.
- Insert following code (with your key):
 ```js
 exports.xivapiProxy = (req, res) => {
   let request = require('request');
   const apiKey = '<your api key>>';
   res.set('Access-Control-Allow-Origin', '<your allowed origins>')
      .set('Access-Control-Allow-Headers', 'Content-Type');
   const url = Buffer.from(req.query.url, 'base64').toString();
   request(
     {
       url:`${url}${url.indexOf('?') > -1 ? '&':'?'}private_key=${apiKey}`,
     }, 
     function(error, response, body) {
     let errorBody = JSON.parse(body);
 	let errorMessage = errorBody.error || errorBody.message;
     if (error || errorMessage) {
       res.status(400).send(errorMessage || 'Unknown Error');
     } else {
       res.status(200).set('Content-Type', 'application/json').send(body);
     }
   });
 };
 ```
- Enable proxy mode inside the api module:
 ```ts
    XivapiClientModule.forRoot('<GCF trigger url>')
 ```

Example url: https://us-central1-myproject.cloudfunctions.net/xivapi-proxy

Keep in mind that you can enable it based on the current environment, simply give `null` as proxy url if environment isn't prod,
to use "normal" mode in order to get better debugging
when using dev environment.
