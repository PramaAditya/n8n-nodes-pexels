# Free stock photos · Pexels

[

Pexels API

](#)

-   [Overview](/api/)
-   [Introduction](#introduction)
-   [Guidelines](#guidelines)
-   [Client Libraries](#client_libraries)
-   [Authorization](#authorization)
-   [Request Statistics](#statistics)
-   [Pagination](#pagination)
-   [Photos](#photos)
    -   [The Photo Resource](#photos-overview)
    -   [Search for Photos](#photos-search)
    -   [Curated Photos](#photos-curated)
    -   [Get a Photo](#photos-show)
-   [Videos](#videos)
    -   [The Video Resource](#videos-overview)
    -   [Search for Videos](#videos-search)
    -   [Popular Videos](#videos-popular)
    -   [Get a Video](#videos-show)
-   [Collections](#collections)
    -   [Overview](#collections-overview)
    -   [The Collection Resource](#collections-resource)
    -   [Featured Collections](#collections-featured)
    -   [My Collections](#collections-all)
    -   [Collection Media](#collections-media)
-   [Changelog](#changelog)

[

## Introduction

](#introduction)

The Pexels API enables programmatic access to the full Pexels content library, including photos, videos. All content is available free of charge, and you are welcome to use Pexels content for anything you'd like, as long as it is within our [Title](#guidelines).

The Pexels API is a RESTful JSON API, and you can interact with it from any language or framework with a HTTP library. Alternately, Pexels maintains some official [Title](#client_libraries) you can use.

If you have any questions, please visit our [Help Center](https://help.pexels.com/hc/en-us/categories/900001326143-API) for answers and troubleshooting.

**Note:** For historical reasons, all endpoints begin with `https://api.pexels.com/v1/` except for video endpoints, which begin with `https://api.pexels.com/videos/`. Please see the individual endpoints listed below for more details about how to call each endpoint.

[

## Guidelines

](#guidelines)

Whenever you are doing an API request make sure to show a **prominent link to Pexels**. You can use a text link (e.g. "Photos provided by Pexels") or a link with our logo.

Always credit our photographers when possible (e.g. "Photo by John Doe on Pexels" with a link to the photo page on Pexels).

You may not copy or replicate core functionality of Pexels (including making Pexels content available as a wallpaper app).

Do not abuse the API. By default, the API is rate-limited to 200 requests per hour and 20,000 requests per month. [You may contact us to request a higher limit](mailto:api@pexels.com), but please include examples, or be prepared to give a demo, that clearly shows your use of the API with attribution. If you meet our API terms, you can get unlimited requests for free.

Abuse of the Pexels API, including but not limited to attempting to work around the rate limit, will lead to termination of your API access.

Linking back to Pexels

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13

<a href="https://www.pexels.com"\>Photos provided by Pexels</a>

<!-- or show our white logo -->

<a href="https://www.pexels.com"\>
  <img src="https://images.pexels.com/lib/api/pexels-white.png" />
</a>

<!-- or show our black logo -->

<a href="https://www.pexels.com"\>
  <img src="https://images.pexels.com/lib/api/pexels.png" />
</a>

Linking back to a Photo

Copy

1

This <a href="https://www.pexels.com/photo/food-dinner-lunch-meal-4147875"\>Photo</a> was taken by <a href="https://www.pexels.com/@daria"\>Daria</a> on Pexels.

[

## Client Libraries

](#client_libraries)

Pexels maintains a number of official API client libraries that you can use to interact with the Pexels API:

Language

Package

Github

Changelog

Version

Ruby

[rubygems](https://rubygems.org/gems/pexels)

[pexels-ruby](https://github.com/pexels/pexels-ruby)

[changelog](https://github.com/pexels/pexels-ruby/blob/master/CHANGES.md)

0.3.0

Javascript

[npm](https://www.npmjs.com/package/pexels)

[pexels-javascript](https://github.com/pexels/pexels-javascript)

[changelog](https://github.com/pexels/pexels-javascript/releases)

1.2.1

.net

[nuget](https://www.nuget.org/packages/PexelsDotNetSDK)

[PexelsDotNetSDK](https://github.com/pexels/PexelsDotNetSDK)

[changelog](https://github.com/pexels/PexelsDotNetSDK/blob/master/Changes.md)

1.0.6

Please read the documentation for the client library you'd like to use for more information about syntax (code samples for each library are available on this documentation). Issues and Pull Requests on Github are also welcome!

If you have created an unofficial Pexels API library for a different language please feel free to let us know about it!

[

## Authorization

](#authorization)

Authorization is required for the Pexels API. Anyone with a Pexels account can [request an API key](/api), which you will receive instantly.

All requests you make to the API will need to include your key. This is provided by adding an `Authorization` header.

Example of Authorization

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/v1/search?query=people"

1
2
3
4
5

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

// All requests made with the client will be authenticated

1
2
3
4

require "pexels"

\# Or just set the PEXELS\_API\_KEY env variable and it will be picked up automatically.
Pexels::Client.new("YOUR\_API\_KEY")

1
2
3

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");

[

## Request Statistics

](#statistics)

To see how many requests you have left in your monthly quota, successful requests from the Pexels API include three HTTP headers:

Response Header

Meaning

`X-Ratelimit-Limit`

Your total request limit for the monthly period

`X-Ratelimit-Remaining`

How many of these requests remain

`X-Ratelimit-Reset`

UNIX timestamp of when the currently monthly period will roll over

**Note:** These response headers are only returned on successful (`2xx`) responses. They are not included with other responses, including `429 Too Many Requests`, which indicates you have exceeded your rate limit. Please be sure to keep track of `X-Ratelimit-Remaining` and `X-Ratelimit-Reset` in order to manage your request limit.

Example of Rate Limit Headers

Copy

1
2
3

X-Ratelimit-Limit: 20000
X-Ratelimit-Remaining: 19684
X-Ratelimit-Reset: 1590529646

[

## Pagination

](#pagination)

Most Pexels API requests return multiple records at once. All of these endpoints are paginated, and can return a maximum of **80** requests at one time. Each paginated request accepts the same parameters and returns the same pagination data in the response.

**Note:** The `prev_page` and `next_page` response attributes will only be returned if there is a corresponding page.

Pagination Request Parameters

Copy

1

GET https://api.pexels.com/v1/curated?page\=2&per\_page\=40

Pagination Response Attributes

Copy

1
2
3
4
5
6
7

{
  "page": 2,
  "per\_page": 40,
  "total\_results": 8000,
  "next\_page": "https://api.pexels.com/v1/curated?page=3&per\_page=40",
  "prev\_page": "https://api.pexels.com/v1/curated?page=1&per\_page=40"
}

[

## The Photo Resource

](#photos-overview)

The `Photo` resource is a JSON formatted version of a Pexels photo. The Photo API endpoints respond with the photo data formatted in this shape.

[

#### Response

](#photos-overview__response)

-   [
    
    id_
    
    integer
    
    _
    
    ](#photos-overview__response__id)
    
    The id of the photo.
    
-   [
    
    width_
    
    integer
    
    _
    
    ](#photos-overview__response__width)
    
    The real width of the photo in pixels.
    
-   [
    
    height_
    
    integer
    
    _
    
    ](#photos-overview__response__height)
    
    The real height of the photo in pixels.
    
-   [
    
    url_
    
    string
    
    _
    
    ](#photos-overview__response__url)
    
    The Pexels URL where the photo is located.
    
-   [
    
    photographer_
    
    string
    
    _
    
    ](#photos-overview__response__photographer)
    
    The name of the photographer who took the photo.
    
-   [
    
    photographer\_url_
    
    string
    
    _
    
    ](#photos-overview__response__photographer_url)
    
    The URL of the photographer's Pexels profile.
    
-   [
    
    photographer\_id_
    
    integer
    
    _
    
    ](#photos-overview__response__photographer_id)
    
    The id of the photographer.
    
-   [
    
    avg\_color_
    
    string
    
    _
    
    ](#photos-overview__response__avg_color)
    
    The average color of the photo. Useful for a placeholder while the image loads.
    
-   [
    
    src_
    
    object
    
    _
    
    ](#photos-overview__response__src)
    
    An assortment of different image sizes that can be used to display this `Photo`.
    
    Show Children
    -   [
        
        original_
        
        string
        
        _
        
        ](#photos-overview__response__src____original)
        
        The image without any size changes. It will be the same as the `width` and `height` attributes.
        
    -   [
        
        large_
        
        string
        
        _
        
        ](#photos-overview__response__src____large)
        
        The image resized to `W 940px X H 650px` `DPR 1`.
        
    -   [
        
        large2x_
        
        string
        
        _
        
        ](#photos-overview__response__src____large2x)
        
        The image resized `W 940px X H 650px` `DPR 2`.
        
    -   [
        
        medium_
        
        string
        
        _
        
        ](#photos-overview__response__src____medium)
        
        The image scaled proportionally so that it's new height is `350px`.
        
    -   [
        
        small_
        
        string
        
        _
        
        ](#photos-overview__response__src____small)
        
        The image scaled proportionally so that it's new height is `130px`.
        
    -   [
        
        portrait_
        
        string
        
        _
        
        ](#photos-overview__response__src____portrait)
        
        The image cropped to `W 800px X H 1200px`.
        
    -   [
        
        landscape_
        
        string
        
        _
        
        ](#photos-overview__response__src____landscape)
        
        The image cropped to `W 1200px X H 627px`.
        
    -   [
        
        tiny_
        
        string
        
        _
        
        ](#photos-overview__response__src____tiny)
        
        The image cropped to `W 280px X H 200px`.
        
-   [
    
    alt_
    
    string
    
    _
    
    ](#photos-overview__response__alt)
    
    Text description of the photo for use in the `alt` attribute.
    

The Photo Resource

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22

{
  "id": 2014422,
  "width": 3024,
  "height": 3024,
  "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
  "photographer": "Joey Farina",
  "photographer\_url": "https://www.pexels.com/@joey",
  "photographer\_id": 680589,
  "avg\_color": "#978E82",
  "src": {
    "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
    "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
    "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
    "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
  },
  "liked": false,
  "alt": "Brown Rocks During Golden Hour"
}

[

## Search for Photos

### `GET https://api.pexels.com/v1/search`

](#photos-search)

This endpoint enables you to search Pexels for any topic that you would like. For example your query could be something broad like `Nature`, `Tigers`, `People`. Or it could be something specific like `Group of people working`.

[

#### Parameters

](#photos-search__parameters)

-   [
    
    query_
    
    string | required
    
    _
    
    ](#photos-search__parameters__query)
    
    The search query. `Ocean`, `Tigers`, `Pears`, etc.
    
-   [
    
    orientation_
    
    string | optional
    
    _
    
    ](#photos-search__parameters__orientation)
    
    Desired photo orientation. The current supported orientations are: `landscape`, `portrait` or `square`.
    
-   [
    
    size_
    
    string | optional
    
    _
    
    ](#photos-search__parameters__size)
    
    Minimum photo size. The current supported sizes are: `large`(24MP), `medium`(12MP) or `small`(4MP).
    
-   [
    
    color_
    
    string | optional
    
    _
    
    ](#photos-search__parameters__color)
    
    Desired photo color. Supported colors: `red`, `orange`, `yellow`, `green`, `turquoise`, `blue`, `violet`, `pink`, `brown`, `black`, `gray`, `white` or any hexidecimal color code (eg. `#ffffff`).
    
-   [
    
    locale_
    
    string | optional
    
    _
    
    ](#photos-search__parameters__locale)
    
    The locale of the search you are performing. The current supported locales are: `en-US`, `pt-BR`, `es-ES`, `ca-ES`, `de-DE`, `it-IT`, `fr-FR`, `sv-SE`, `id-ID`, `pl-PL`, `ja-JP`, `zh-TW`, `zh-CN`, `ko-KR`, `th-TH`, `nl-NL`, `hu-HU`, `vi-VN`, `cs-CZ`, `da-DK`, `fi-FI`, `uk-UA`, `el-GR`, `ro-RO`, `nb-NO`, `sk-SK`, `tr-TR`, `ru-RU`.
    
-   [
    
    page_
    
    integer | optional
    
    _
    
    ](#photos-search__parameters__page)
    
    The page number you are requesting. `Default: 1`
    
-   [
    
    per\_page_
    
    integer | optional
    
    _
    
    ](#photos-search__parameters__per_page)
    
    The number of results you are requesting per page. `Default: 15` `Max: 80`
    

[

#### Response

](#photos-search__response)

-   [
    
    photos_
    
    array of `Photo`
    
    _
    
    ](#photos-search__response__photos)
    
    An array of `Photo` objects.
    
-   [
    
    page_
    
    integer
    
    _
    
    ](#photos-search__response__page)
    
    The current page number.
    
-   [
    
    per\_page_
    
    integer
    
    _
    
    ](#photos-search__response__per_page)
    
    The number of results returned with each page.
    
-   [
    
    total\_results_
    
    integer
    
    _
    
    ](#photos-search__response__total_results)
    
    The total number of results for the request.
    
-   [
    
    prev\_page_
    
    string | optional
    
    _
    
    ](#photos-search__response__prev_page)
    
    URL for the previous page of results, if applicable.
    
-   [
    
    next\_page_
    
    string | optional
    
    _
    
    ](#photos-search__response__next_page)
    
    URL for the next page of results, if applicable.
    

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/v1/search?query=nature&per\_page=1"

1
2
3
4
5
6

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');
const query \= 'Nature';

client.photos.search({ query, per\_page: 1 }).then(photos \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.photos.search("Nature", per\_page: 1).each do |photo|
  \# ...
end

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.SearchPhotosAsync("Nature");

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30

{
  "total\_results": 10000,
  "page": 1,
  "per\_page": 1,
  "photos": \[
    {
      "id": 3573351,
      "width": 3066,
      "height": 3968,
      "url": "https://www.pexels.com/photo/trees-during-day-3573351/",
      "photographer": "Lukas Rodriguez",
      "photographer\_url": "https://www.pexels.com/@lukas-rodriguez-1845331",
      "photographer\_id": 1845331,
      "avg\_color": "#374824",
      "src": {
        "original": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png",
        "large2x": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
      },
      "liked": false,
      "alt": "Brown Rocks During Golden Hour"
    }
  \],
  "next\_page": "https://api.pexels.com/v1/search/?page=2&per\_page=1&query=nature"
}

[

## Curated Photos

### `GET https://api.pexels.com/v1/curated`

](#photos-curated)

This endpoint enables you to receive real-time photos curated by the Pexels team.

We add at least one new photo per hour to our curated list so that you always get a changing selection of trending photos.

[

#### Parameters

](#photos-curated__parameters)

-   [
    
    page_
    
    integer | optional
    
    _
    
    ](#photos-curated__parameters__page)
    
    The page number you are requesting. `Default: 1`
    
-   [
    
    per\_page_
    
    integer | optional
    
    _
    
    ](#photos-curated__parameters__per_page)
    
    The number of results you are requesting per page. `Default: 15` `Max: 80`
    

[

#### Response

](#photos-curated__response)

-   [
    
    photos_
    
    array of `Photo`
    
    _
    
    ](#photos-curated__response__photos)
    
    An array of `Photo` objects.
    
-   [
    
    page_
    
    integer
    
    _
    
    ](#photos-curated__response__page)
    
    The current page number.
    
-   [
    
    per\_page_
    
    integer
    
    _
    
    ](#photos-curated__response__per_page)
    
    The number of results returned with each page.
    
-   [
    
    total\_results_
    
    integer
    
    _
    
    ](#photos-curated__response__total_results)
    
    The total number of results for the request.
    
-   [
    
    prev\_page_
    
    string | optional
    
    _
    
    ](#photos-curated__response__prev_page)
    
    URL for the previous page of results, if applicable.
    
-   [
    
    next\_page_
    
    string | optional
    
    _
    
    ](#photos-curated__response__next_page)
    
    URL for the next page of results, if applicable.
    

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/v1/curated?per\_page=1"

1
2
3
4
5

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

client.photos.curated({ per\_page: 1 }).then(photos \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.photos.curated(per\_page: 1).each do |photo|
  \# ...
end

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.CuratedPhotosAsync(pageSize: 15);

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29

{
  "page": 1,
  "per\_page": 1,
  "photos": \[
    {
      "id": 2880507,
      "width": 4000,
      "height": 6000,
      "url": "https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/",
      "photographer": "Deden Dicky Ramdhani",
      "photographer\_url": "https://www.pexels.com/@drdeden88",
      "photographer\_id": 1378810,
      "avg\_color": "#7E7F7B",
      "src": {
        "original": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg",
        "large2x": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
      },
      "liked": false,
      "alt": "Brown Rocks During Golden Hour"
    }
  \],
  "next\_page": "https://api.pexels.com/v1/curated/?page=2&per\_page=1"
}

[

## Get a Photo

### `GET https://api.pexels.com/v1/photos/:id`

](#photos-show)

Retrieve a specific `Photo` from its id.

[

#### Parameters

](#photos-show__parameters)

-   [
    
    id_
    
    integer | required
    
    _
    
    ](#photos-show__parameters__id)
    
    The id of the photo you are requesting.
    

[

#### Response

](#photos-show__response)

Returns a `Photo` object

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/v1/photos/2014422"

1
2
3
4
5
6

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

client.photos.show({ id: 2014422 }).then(photo \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.photos.find(2014422)
\# or
client.photos\[2014422\]

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.GetPhotoAsync(2014422);

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22

{
  "id": 2014422,
  "width": 3024,
  "height": 3024,
  "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
  "photographer": "Joey Farina",
  "photographer\_url": "https://www.pexels.com/@joey",
  "photographer\_id": 680589,
  "avg\_color": "#978E82",
  "src": {
    "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
    "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
    "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
    "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
  },
  "liked": false,
  "alt": "Brown Rocks During Golden Hour"
}

[

## The Video Resource

](#videos-overview)

The `Video` resource is a JSON formatted version of a Pexels video. The Video API endpoints respond with the video data formatted in this shape.

[

#### Response

](#videos-overview__response)

-   [
    
    id_
    
    integer
    
    _
    
    ](#videos-overview__response__id)
    
    The id of the video.
    
-   [
    
    width_
    
    integer
    
    _
    
    ](#videos-overview__response__width)
    
    The real width of the video in pixels.
    
-   [
    
    height_
    
    integer
    
    _
    
    ](#videos-overview__response__height)
    
    The real height of the video in pixels.
    
-   [
    
    url_
    
    string
    
    _
    
    ](#videos-overview__response__url)
    
    The Pexels URL where the video is located.
    
-   [
    
    image_
    
    string
    
    _
    
    ](#videos-overview__response__image)
    
    URL to a screenshot of the video.
    
-   [
    
    duration_
    
    integer
    
    _
    
    ](#videos-overview__response__duration)
    
    The duration of the video in seconds.
    
-   [
    
    user_
    
    object
    
    _
    
    ](#videos-overview__response__user)
    
    The videographer who shot the video.
    
    Show Children
    -   [
        
        id_
        
        integer
        
        _
        
        ](#videos-overview__response__user____id)
        
        The id of the videographer.
        
    -   [
        
        name_
        
        string
        
        _
        
        ](#videos-overview__response__user____name)
        
        The name of the videographer.
        
    -   [
        
        url_
        
        string
        
        _
        
        ](#videos-overview__response__user____url)
        
        The URL of the videographer's Pexels profile.
        
-   [
    
    video\_files_
    
    Array of objects
    
    _
    
    ](#videos-overview__response__video_files)
    
    An array of different sized versions of the video.
    
    Show Children
    -   [
        
        id_
        
        integer
        
        _
        
        ](#videos-overview__response__video_files____id)
        
        The id of the `video_file`.
        
    -   [
        
        quality_
        
        `'hd'` or `'sd'`
        
        _
        
        ](#videos-overview__response__video_files____quality)
        
        The video quality of the `video_file`.
        
    -   [
        
        file\_type_
        
        string
        
        _
        
        ](#videos-overview__response__video_files____file_type)
        
        The video format of the `video_file`.
        
    -   [
        
        width_
        
        integer
        
        _
        
        ](#videos-overview__response__video_files____width)
        
        The width of the `video_file` in pixels.
        
    -   [
        
        height_
        
        integer
        
        _
        
        ](#videos-overview__response__video_files____height)
        
        The height of the `video_file` in pixels.
        
    -   [
        
        fps_
        
        number
        
        _
        
        ](#videos-overview__response__video_files____fps)
        
        The number of frames per second of the `video_file`.
        
    -   [
        
        link_
        
        string
        
        _
        
        ](#videos-overview__response__video_files____link)
        
        A link to where the `video_file` is hosted.
        
-   [
    
    video\_pictures_
    
    Array of objects
    
    _
    
    ](#videos-overview__response__video_pictures)
    
    An array of preview pictures of the video.
    
    Show Children
    -   [
        
        id_
        
        integer
        
        _
        
        ](#videos-overview__response__video_pictures____id)
        
        The id of the `video_picture`.
        
    -   [
        
        picture_
        
        string
        
        _
        
        ](#videos-overview__response__video_pictures____picture)
        
        A link to the preview image.
        
    -   [
        
        nr_
        
        integer
        
        _
        
        ](#videos-overview__response__video_pictures____nr)
        

The Video Resource

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68

{
  "id": 2499611,
  "width": 1080,
  "height": 1920,
  "url": "https://www.pexels.com/video/2499611/",
  "image": "https://images.pexels.com/videos/2499611/free-video-2499611.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
  "full\_res": null,
  "tags": \[\],
  "duration": 22,
  "user": {
    "id": 680589,
    "name": "Joey Farina",
    "url": "https://www.pexels.com/@joey"
  },
  "video\_files": \[
    {
      "id": 125004,
      "quality": "hd",
      "file\_type": "video/mp4",
      "width": 1080,
      "height": 1920,
      "fps": 23.976,
      "link": "https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile\_id=175&oauth2\_token\_id=57447761"
    },
    {
      "id": 125005,
      "quality": "sd",
      "file\_type": "video/mp4",
      "width": 540,
      "height": 960,
      "fps": 23.976,
      "link": "https://player.vimeo.com/external/342571552.sd.mp4?s=e0df43853c25598dfd0ec4d3f413bce1e002deef&profile\_id=165&oauth2\_token\_id=57447761"
    },
    {
      "id": 125006,
      "quality": "sd",
      "file\_type": "video/mp4",
      "width": 240,
      "height": 426,
      "fps": 23.976,
      "link": "https://player.vimeo.com/external/342571552.sd.mp4?s=e0df43853c25598dfd0ec4d3f413bce1e002deef&profile\_id=139&oauth2\_token\_id=57447761"
    }
    ...
  \],
  "video\_pictures": \[
    {
      "id": 308178,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-0.jpg",
      "nr": 0
    },
    {
      "id": 308179,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-1.jpg",
      "nr": 1
    },
    {
      "id": 308180,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-2.jpg",
      "nr": 2
    },
    {
      "id": 308181,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-3.jpg",
      "nr": 3
    }
    ...
  \]
}

[

## Search for Videos

### `GET https://api.pexels.com/videos/search`

](#videos-search)

This endpoint enables you to search Pexels for any topic that you would like. For example your query could be something broad like `Nature`, `Tigers`, `People`. Or it could be something specific like `Group of people working`.

[

#### Parameters

](#videos-search__parameters)

-   [
    
    query_
    
    string | required
    
    _
    
    ](#videos-search__parameters__query)
    
    The search query. `Ocean`, `Tigers`, `Pears`, etc.
    
-   [
    
    orientation_
    
    string | optional
    
    _
    
    ](#videos-search__parameters__orientation)
    
    Desired video orientation. The current supported orientations are: `landscape`, `portrait` or `square`.
    
-   [
    
    size_
    
    string | optional
    
    _
    
    ](#videos-search__parameters__size)
    
    Minimum video size. The current supported sizes are: `large`(4K), `medium`(Full HD) or `small`(HD).
    
-   [
    
    locale_
    
    string | optional
    
    _
    
    ](#videos-search__parameters__locale)
    
    The locale of the search you are performing. The current supported locales are: `en-US`, `pt-BR`, `es-ES`, `ca-ES`, `de-DE`, `it-IT`, `fr-FR`, `sv-SE`, `id-ID`, `pl-PL`, `ja-JP`, `zh-TW`, `zh-CN`, `ko-KR`, `th-TH`, `nl-NL`, `hu-HU`, `vi-VN`, `cs-CZ`, `da-DK`, `fi-FI`, `uk-UA`, `el-GR`, `ro-RO`, `nb-NO`, `sk-SK`, `tr-TR`, `ru-RU`.
    
-   [
    
    page_
    
    integer | optional
    
    _
    
    ](#videos-search__parameters__page)
    
    The page number you are requesting. `Default: 1`
    
-   [
    
    per\_page_
    
    integer | optional
    
    _
    
    ](#videos-search__parameters__per_page)
    
    The number of results you are requesting per page. `Default: 15` `Max: 80`
    

[

#### Response

](#videos-search__response)

-   [
    
    videos_
    
    array of `Video`
    
    _
    
    ](#videos-search__response__videos)
    
    An array of `Video` objects.
    
-   [
    
    url_
    
    string
    
    _
    
    ](#videos-search__response__url)
    
    The Pexels URL for the current search query.
    
-   [
    
    page_
    
    integer
    
    _
    
    ](#videos-search__response__page)
    
    The current page number.
    
-   [
    
    per\_page_
    
    integer
    
    _
    
    ](#videos-search__response__per_page)
    
    The number of results returned with each page.
    
-   [
    
    total\_results_
    
    integer
    
    _
    
    ](#videos-search__response__total_results)
    
    The total number of results for the request.
    
-   [
    
    prev\_page_
    
    string | optional
    
    _
    
    ](#videos-search__response__prev_page)
    
    URL for the previous page of results, if applicable.
    
-   [
    
    next\_page_
    
    string | optional
    
    _
    
    ](#videos-search__response__next_page)
    
    URL for the next page of results, if applicable.
    

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/videos/search?query=nature&per\_page=1"

1
2
3
4
5
6

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');
const query \= 'Nature';

client.videoes.search({ query, per\_page: 1 }).then(videos \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.videos.search("Nature", per\_page: 1).each do |video|
  \# ...
end

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.SearchVideosAsync("Nature");

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156

{
  "page": 1,
  "per\_page": 1,
  "total\_results": 20475,
  "url": "https://www.pexels.com/videos/",
  "videos": \[
    {
      "id": 1448735,
      "width": 4096,
      "height": 2160,
      "url": "https://www.pexels.com/video/video-of-forest-1448735/",
      "image": "https://images.pexels.com/videos/1448735/free-video-1448735.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
      "duration": 32,
      "user": {
        "id": 574687,
        "name": "Ruvim Miksanskiy",
        "url": "https://www.pexels.com/@digitech"
      },
      "video\_files": \[
        {
          "id": 58649,
          "quality": "sd",
          "file\_type": "video/mp4",
          "width": 640,
          "height": 338,
          "link": "https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile\_id=164&oauth2\_token\_id=57447761"
        },
        {
          "id": 58650,
          "quality": "hd",
          "file\_type": "video/mp4",
          "width": 2048,
          "height": 1080,
          "link": "https://player.vimeo.com/external/291648067.hd.mp4?s=94998971682c6a3267e4cbd19d16a7b6c720f345&profile\_id=175&oauth2\_token\_id=57447761"
        },
        {
          "id": 58651,
          "quality": "hd",
          "file\_type": "video/mp4",
          "width": 4096,
          "height": 2160,
          "link": "https://player.vimeo.com/external/291648067.hd.mp4?s=94998971682c6a3267e4cbd19d16a7b6c720f345&profile\_id=172&oauth2\_token\_id=57447761"
        },
        {
          "id": 58652,
          "quality": "hd",
          "file\_type": "video/mp4",
          "width": 1366,
          "height": 720,
          "link": "https://player.vimeo.com/external/291648067.hd.mp4?s=94998971682c6a3267e4cbd19d16a7b6c720f345&profile\_id=174&oauth2\_token\_id=57447761"
        },
        {
          "id": 58653,
          "quality": "hd",
          "file\_type": "video/mp4",
          "width": 2732,
          "height": 1440,
          "link": "https://player.vimeo.com/external/291648067.hd.mp4?s=94998971682c6a3267e4cbd19d16a7b6c720f345&profile\_id=170&oauth2\_token\_id=57447761"
        },
        {
          "id": 58654,
          "quality": "sd",
          "file\_type": "video/mp4",
          "width": 960,
          "height": 506,
          "link": "https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile\_id=165&oauth2\_token\_id=57447761"
        },
        {
          "id": 58655,
          "quality": "hls",
          "file\_type": "video/mp4",
          "width": null,
          "height": null,
          "link": "https://player.vimeo.com/external/291648067.m3u8?s=1210fac9d80f9b74b4a334c4fca327cde08886b2&oauth2\_token\_id=57447761"
        }
      \],
      "video\_pictures": \[
        {
          "id": 133236,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-0.jpg",
          "nr": 0
        },
        {
          "id": 133237,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-1.jpg",
          "nr": 1
        },
        {
          "id": 133238,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-2.jpg",
          "nr": 2
        },
        {
          "id": 133239,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-3.jpg",
          "nr": 3
        },
        {
          "id": 133240,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-4.jpg",
          "nr": 4
        },
        {
          "id": 133241,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-5.jpg",
          "nr": 5
        },
        {
          "id": 133242,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-6.jpg",
          "nr": 6
        },
        {
          "id": 133243,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-7.jpg",
          "nr": 7
        },
        {
          "id": 133244,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-8.jpg",
          "nr": 8
        },
        {
          "id": 133245,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-9.jpg",
          "nr": 9
        },
        {
          "id": 133246,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-10.jpg",
          "nr": 10
        },
        {
          "id": 133247,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-11.jpg",
          "nr": 11
        },
        {
          "id": 133248,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-12.jpg",
          "nr": 12
        },
        {
          "id": 133249,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-13.jpg",
          "nr": 13
        },
        {
          "id": 133250,
          "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-14.jpg",
          "nr": 14
        }
      \]
    }
  \]
}

[

## Popular Videos

### `GET https://api.pexels.com/videos/popular`

](#videos-popular)

This endpoint enables you to receive the current popular Pexels videos.

[

#### Parameters

](#videos-popular__parameters)

-   [
    
    min\_width_
    
    integer | optional
    
    _
    
    ](#videos-popular__parameters__min_width)
    
    The minimum width in pixels of the returned videos.
    
-   [
    
    min\_height_
    
    integer | optional
    
    _
    
    ](#videos-popular__parameters__min_height)
    
    The minimum height in pixels of the returned videos.
    
-   [
    
    min\_duration_
    
    integer | optional
    
    _
    
    ](#videos-popular__parameters__min_duration)
    
    The minimum duration in seconds of the returned videos.
    
-   [
    
    max\_duration_
    
    integer | optional
    
    _
    
    ](#videos-popular__parameters__max_duration)
    
    The maximum duration in seconds of the returned videos.
    
-   [
    
    page_
    
    integer | optional
    
    _
    
    ](#videos-popular__parameters__page)
    
    The page number you are requesting. `Default: 1`
    
-   [
    
    per\_page_
    
    integer | optional
    
    _
    
    ](#videos-popular__parameters__per_page)
    
    The number of results you are requesting per page. `Default: 15` `Max: 80`
    

[

#### Response

](#videos-popular__response)

-   [
    
    videos_
    
    array of `Video`
    
    _
    
    ](#videos-popular__response__videos)
    
    An array of `Video` objects.
    
-   [
    
    url_
    
    string
    
    _
    
    ](#videos-popular__response__url)
    
    The Pexels URL for the current page.
    
-   [
    
    page_
    
    integer
    
    _
    
    ](#videos-popular__response__page)
    
    The current page number.
    
-   [
    
    per\_page_
    
    integer
    
    _
    
    ](#videos-popular__response__per_page)
    
    The number of results returned with each page.
    
-   [
    
    total\_results_
    
    integer
    
    _
    
    ](#videos-popular__response__total_results)
    
    The total number of results for the request.
    
-   [
    
    prev\_page_
    
    string | optional
    
    _
    
    ](#videos-popular__response__prev_page)
    
    URL for the previous page of results, if applicable.
    
-   [
    
    next\_page_
    
    string | optional
    
    _
    
    ](#videos-popular__response__next_page)
    
    URL for the next page of results, if applicable.
    

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/videos/popular?per\_page=1"

1
2
3
4
5

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

client.videos.popular({ per\_page: 1 }).then(videos \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.videos.popular(per\_page: 1).each do |video|
  \# ...
end

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.PopularVideosAsync(pageSize: 15);

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140

{
  "page": 1,
  "per\_page": 1,
  "total\_results": 4089,
  "url": "https://www.pexels.com/search/videos/Nature/",
  "videos": \[
    {
      "id": 1093662,
      "width": 1920,
      "height": 1080,
      "url": "https://www.pexels.com/video/water-crashing-over-the-rocks-1093662/",
      "image": "https://images.pexels.com/videos/1093662/free-video-1093662.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
      "duration": 8,
      "user": {
        "id": 417939,
        "name": "Peter Fowler",
        "url": "https://www.pexels.com/@peter-fowler-417939"
      },
      "video\_files": \[
        {
          "id": 37101,
          "quality": "hd",
          "file\_type": "video/mp4",
          "width": 1280,
          "height": 720,
          "link": "https://player.vimeo.com/external/269971860.hd.mp4?s=eae965838585cc8342bb5d5253d06a52b2415570&profile\_id=174&oauth2\_token\_id=57447761"
        },
        {
          "id": 37102,
          "quality": "sd",
          "file\_type": "video/mp4",
          "width": 640,
          "height": 360,
          "link": "https://player.vimeo.com/external/269971860.sd.mp4?s=a3036bd1a9f15c1b31daedad98c06a3b24cdd747&profile\_id=164&oauth2\_token\_id=57447761"
        },
        {
          "id": 37103,
          "quality": "hd",
          "file\_type": "video/mp4",
          "width": 1920,
          "height": 1080,
          "link": "https://player.vimeo.com/external/269971860.hd.mp4?s=eae965838585cc8342bb5d5253d06a52b2415570&profile\_id=175&oauth2\_token\_id=57447761"
        },
        {
          "id": 37104,
          "quality": "sd",
          "file\_type": "video/mp4",
          "width": 960,
          "height": 540,
          "link": "https://player.vimeo.com/external/269971860.sd.mp4?s=a3036bd1a9f15c1b31daedad98c06a3b24cdd747&profile\_id=165&oauth2\_token\_id=57447761"
        },
        {
          "id": 37105,
          "quality": "hls",
          "file\_type": "video/mp4",
          "width": null,
          "height": null,
          "link": "https://player.vimeo.com/external/269971860.m3u8?s=ac08929c597387cc77ae3d88bfe2ad66a9c4d31f&oauth2\_token\_id=57447761"
        }
      \],
      "video\_pictures": \[
        {
          "id": 79696,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-0.jpg",
          "nr": 0
        },
        {
          "id": 79697,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-1.jpg",
          "nr": 1
        },
        {
          "id": 79698,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-2.jpg",
          "nr": 2
        },
        {
          "id": 79699,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-3.jpg",
          "nr": 3
        },
        {
          "id": 79700,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-4.jpg",
          "nr": 4
        },
        {
          "id": 79701,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-5.jpg",
          "nr": 5
        },
        {
          "id": 79702,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-6.jpg",
          "nr": 6
        },
        {
          "id": 79703,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-7.jpg",
          "nr": 7
        },
        {
          "id": 79704,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-8.jpg",
          "nr": 8
        },
        {
          "id": 79705,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-9.jpg",
          "nr": 9
        },
        {
          "id": 79706,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-10.jpg",
          "nr": 10
        },
        {
          "id": 79707,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-11.jpg",
          "nr": 11
        },
        {
          "id": 79708,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-12.jpg",
          "nr": 12
        },
        {
          "id": 79709,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-13.jpg",
          "nr": 13
        },
        {
          "id": 79710,
          "picture": "https://static-videos.pexels.com/videos/1093662/pictures/preview-14.jpg",
          "nr": 14
        }
      \]
    }
  \]
}

[

## Get a Video

### `GET https://api.pexels.com/videos/videos/:id`

](#videos-show)

Retrieve a specific `Video` from its id.

[

#### Parameters

](#videos-show__parameters)

-   [
    
    id_
    
    integer | required
    
    _
    
    ](#videos-show__parameters__id)
    
    The id of the video you are requesting.
    

[

#### Response

](#videos-show__response)

Returns a `Video` object

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/videos/videos/2499611"

1
2
3
4
5
6

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

client.photos.show({ id: 2499611 }).then(photo \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.videos.find(2499611)
\# or
client.videos\[2499611\]

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.GetVideoAsync(2499611);

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140

{
  "id": 2499611,
  "width": 1080,
  "height": 1920,
  "url": "https://www.pexels.com/video/2499611/",
  "image": "https://images.pexels.com/videos/2499611/free-video-2499611.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
  "duration": 22,
  "user": {
    "id": 680589,
    "name": "Joey Farina",
    "url": "https://www.pexels.com/@joey"
  },
  "video\_files": \[
    {
      "id": 125004,
      "quality": "hd",
      "file\_type": "video/mp4",
      "width": 1080,
      "height": 1920,
      "link": "https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile\_id=175&oauth2\_token\_id=57447761"
    },
    {
      "id": 125005,
      "quality": "sd",
      "file\_type": "video/mp4",
      "width": 540,
      "height": 960,
      "link": "https://player.vimeo.com/external/342571552.sd.mp4?s=e0df43853c25598dfd0ec4d3f413bce1e002deef&profile\_id=165&oauth2\_token\_id=57447761"
    },
    {
      "id": 125006,
      "quality": "sd",
      "file\_type": "video/mp4",
      "width": 240,
      "height": 426,
      "link": "https://player.vimeo.com/external/342571552.sd.mp4?s=e0df43853c25598dfd0ec4d3f413bce1e002deef&profile\_id=139&oauth2\_token\_id=57447761"
    },
    {
      "id": 125007,
      "quality": "hd",
      "file\_type": "video/mp4",
      "width": 720,
      "height": 1280,
      "link": "https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile\_id=174&oauth2\_token\_id=57447761"
    },
    {
      "id": 125008,
      "quality": "sd",
      "file\_type": "video/mp4",
      "width": 360,
      "height": 640,
      "link": "https://player.vimeo.com/external/342571552.sd.mp4?s=e0df43853c25598dfd0ec4d3f413bce1e002deef&profile\_id=164&oauth2\_token\_id=57447761"
    },
    {
      "id": 125009,
      "quality": "hls",
      "file\_type": "video/mp4",
      "width": null,
      "height": null,
      "link": "https://player.vimeo.com/external/342571552.m3u8?s=53433233e4176eead03ddd6fea04d9fb2bce6637&oauth2\_token\_id=57447761"
    }
  \],
  "video\_pictures": \[
    {
      "id": 308178,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-0.jpg",
      "nr": 0
    },
    {
      "id": 308179,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-1.jpg",
      "nr": 1
    },
    {
      "id": 308180,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-2.jpg",
      "nr": 2
    },
    {
      "id": 308181,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-3.jpg",
      "nr": 3
    },
    {
      "id": 308182,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-4.jpg",
      "nr": 4
    },
    {
      "id": 308183,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-5.jpg",
      "nr": 5
    },
    {
      "id": 308184,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-6.jpg",
      "nr": 6
    },
    {
      "id": 308185,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-7.jpg",
      "nr": 7
    },
    {
      "id": 308186,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-8.jpg",
      "nr": 8
    },
    {
      "id": 308187,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-9.jpg",
      "nr": 9
    },
    {
      "id": 308188,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-10.jpg",
      "nr": 10
    },
    {
      "id": 308189,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-11.jpg",
      "nr": 11
    },
    {
      "id": 308190,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-12.jpg",
      "nr": 12
    },
    {
      "id": 308191,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-13.jpg",
      "nr": 13
    },
    {
      "id": 308192,
      "picture": "https://static-videos.pexels.com/videos/2499611/pictures/preview-14.jpg",
      "nr": 14
    }
  \]
}

[

## Overview

](#collections-overview)

Pexels Collections are a way to group specific photos and videos into one unified gallery. This can be useful if, for example, you want to expose a specific subset of Pexels content to your users. You can access all your collections and the media within them via the Pexels API.

**Note:** Collections cannot be created or modified using the Pexels API. Rather, you can manage your collections on the Pexels website, iOS or Android app. API only gives you access to **featured collections** and **your own collections**.

[

## The Collection Resource

](#collections-resource)

The `Collection` resource is a JSON formatted version of a Pexels collection. The Collection list endpoint responds with the collection data formatted in this shape.

[

#### Response

](#collections-resource__response)

-   [
    
    id_
    
    string
    
    _
    
    ](#collections-resource__response__id)
    
    The id of the collection.
    
-   [
    
    title_
    
    string
    
    _
    
    ](#collections-resource__response__title)
    
    The name of the collection.
    
-   [
    
    description_
    
    string
    
    _
    
    ](#collections-resource__response__description)
    
    The description of the collection.
    
-   [
    
    private_
    
    boolean
    
    _
    
    ](#collections-resource__response__private)
    
    Whether or not the collection is marked as private.
    
-   [
    
    media\_count_
    
    integer
    
    _
    
    ](#collections-resource__response__media_count)
    
    The total number of media included in this collection.
    
-   [
    
    photos\_count_
    
    integer
    
    _
    
    ](#collections-resource__response__photos_count)
    
    The total number of photos included in this collection.
    
-   [
    
    videos\_count_
    
    integer
    
    _
    
    ](#collections-resource__response__videos_count)
    
    The total number of videos included in this collection.
    

The Collection Resource

Copy

1
2
3
4
5
6
7
8
9

{
  "id": "8xntbhr",
  "title": "Hello Spring",
  "description": "Baby chicks, rabbits & pretty flowers. What's not to love?",
  "private": false,
  "media\_count": 130,
  "photos\_count": 121,
  "videos\_count": 9
}

[

## Featured Collections

### `GET https://api.pexels.com/v1/collections/featured`

](#collections-featured)

This endpoint returns all featured collections on Pexels.

[

#### Parameters

](#collections-featured__parameters)

-   [
    
    page_
    
    integer | optional
    
    _
    
    ](#collections-featured__parameters__page)
    
    The page number you are requesting. `Default: 1`
    
-   [
    
    per\_page_
    
    integer | optional
    
    _
    
    ](#collections-featured__parameters__per_page)
    
    The number of results you are requesting per page. `Default: 15` `Max: 80`
    

[

#### Response

](#collections-featured__response)

-   [
    
    collections_
    
    array of `Collection`
    
    _
    
    ](#collections-featured__response__collections)
    
    An array of `Collection` objects.
    
-   [
    
    page_
    
    integer
    
    _
    
    ](#collections-featured__response__page)
    
    The current page number.
    
-   [
    
    per\_page_
    
    integer
    
    _
    
    ](#collections-featured__response__per_page)
    
    The number of results returned with each page.
    
-   [
    
    total\_results_
    
    integer
    
    _
    
    ](#collections-featured__response__total_results)
    
    The total number of results for the request.
    
-   [
    
    prev\_page_
    
    string | optional
    
    _
    
    ](#collections-featured__response__prev_page)
    
    URL for the previous page of results, if applicable.
    
-   [
    
    next\_page_
    
    string | optional
    
    _
    
    ](#collections-featured__response__next_page)
    
    URL for the next page of results, if applicable.
    

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/v1/collections/featured?per\_page=1"

1
2
3
4
5

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

client.collections.featured({ per\_page: 10 }).then(collections \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.collections.featured.each do |collection|
  \# ...
end

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.FeaturedCollectionsAsync(pageSize: 15);

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19

{
  "collections": \[
    {
      "id": "9mp14cx",
      "title": "Cool Cats",
      "description": null,
      "private": false,
      "media\_count": 6,
      "photos\_count": 5,
      "videos\_count": 1
    }
  \],

  "page": 2,
  "per\_page": 1,
  "total\_results": 5,
  "next\_page": "https://api.pexels.com/v1/collections/featured/?page=3&per\_page=1",
  "prev\_page": "https://api.pexels.com/v1/collections/featured?page=1&per\_page=1"
}

[

## My Collections

### `GET https://api.pexels.com/v1/collections`

](#collections-all)

This endpoint returns all of your collections.

[

#### Parameters

](#collections-all__parameters)

-   [
    
    page_
    
    integer | optional
    
    _
    
    ](#collections-all__parameters__page)
    
    The page number you are requesting. `Default: 1`
    
-   [
    
    per\_page_
    
    integer | optional
    
    _
    
    ](#collections-all__parameters__per_page)
    
    The number of results you are requesting per page. `Default: 15` `Max: 80`
    

[

#### Response

](#collections-all__response)

-   [
    
    collections_
    
    array of `Collection`
    
    _
    
    ](#collections-all__response__collections)
    
    An array of `Collection` objects.
    
-   [
    
    page_
    
    integer
    
    _
    
    ](#collections-all__response__page)
    
    The current page number.
    
-   [
    
    per\_page_
    
    integer
    
    _
    
    ](#collections-all__response__per_page)
    
    The number of results returned with each page.
    
-   [
    
    total\_results_
    
    integer
    
    _
    
    ](#collections-all__response__total_results)
    
    The total number of results for the request.
    
-   [
    
    prev\_page_
    
    string | optional
    
    _
    
    ](#collections-all__response__prev_page)
    
    URL for the previous page of results, if applicable.
    
-   [
    
    next\_page_
    
    string | optional
    
    _
    
    ](#collections-all__response__next_page)
    
    URL for the next page of results, if applicable.
    

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/v1/collections?per\_page=1"

1
2
3
4
5

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

client.collections.all({ per\_page: 1 }).then(collections \=> {...});

1
2
3
4
5
6
7

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.collections.all.each do |collection|
  \# ...
end

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.CollectionsAsync(pageSize: 15);

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19

{
  "collections": \[
    {
      "id": "9mp14cx",
      "title": "Cool Cats",
      "description": null,
      "private": false,
      "media\_count": 6,
      "photos\_count": 5,
      "videos\_count": 1
    }
  \],

  "page": 2,
  "per\_page": 1,
  "total\_results": 5,
  "next\_page": "https://api.pexels.com/v1/collections/?page=3&per\_page=1",
  "prev\_page": "https://api.pexels.com/v1/collections/?page=1&per\_page=1"
}

[

## Collection Media

### `GET https://api.pexels.com/v1/collections/:id`

](#collections-media)

This endpoint returns all the media (photos and videos) within a single collection. You can filter to only receive photos or videos using the `type` parameter.

[

#### Parameters

](#collections-media__parameters)

-   [
    
    type_
    
    string | optional
    
    _
    
    ](#collections-media__parameters__type)
    
    The type of media you are requesting. If not given or if given with an invalid value, all media will be returned. Supported values are `photos` and `videos`.
    
-   [
    
    sort_
    
    string | optional
    
    _
    
    ](#collections-media__parameters__sort)
    
    The order of items in the media collection. Supported values are: `asc`, `desc`. `Default: asc`
    
-   [
    
    page_
    
    integer | optional
    
    _
    
    ](#collections-media__parameters__page)
    
    The page number you are requesting. `Default: 1`
    
-   [
    
    per\_page_
    
    integer | optional
    
    _
    
    ](#collections-media__parameters__per_page)
    
    The number of results you are requesting per page. `Default: 15` `Max: 80`
    

[

#### Response

](#collections-media__response)

-   [
    
    id_
    
    string
    
    _
    
    ](#collections-media__response__id)
    
    The id of the collection you are requesting.
    
-   [
    
    media_
    
    array of `Photo` or `Video` objects.
    
    _
    
    ](#collections-media__response__media)
    
    An array of media objects. Each object has an extra `type` attribute to indicate the type of object.
    
-   [
    
    page_
    
    integer
    
    _
    
    ](#collections-media__response__page)
    
    The current page number.
    
-   [
    
    per\_page_
    
    integer
    
    _
    
    ](#collections-media__response__per_page)
    
    The number of results returned with each page.
    
-   [
    
    total\_results_
    
    integer
    
    _
    
    ](#collections-media__response__total_results)
    
    The total number of results for the request.
    
-   [
    
    prev\_page_
    
    string | optional
    
    _
    
    ](#collections-media__response__prev_page)
    
    URL for the previous page of results, if applicable.
    
-   [
    
    next\_page_
    
    string | optional
    
    _
    
    ](#collections-media__response__next_page)
    
    URL for the next page of results, if applicable.
    

Example Request

Bash JavaScript Ruby .Net Copy

1
2

curl \-H "Authorization: YOUR\_API\_KEY" \\
  "https://api.pexels.com/v1/collections/9mp14cx?per\_page=1&sort=desc"

1
2
3
4
5

import { createClient } from 'pexels';

const client \= createClient('YOUR\_API\_KEY');

client.collections.media({ per\_page: 1 }).then(media \=> {...});

1
2
3
4
5
6
7
8
9
10
11

require "pexels"

client \= Pexels::Client.new("YOUR\_API\_KEY")

client.collections.find("9mp14cx").media.each do |medium|
  if medium.photo?
    \# ...
  elsif medium.video?
    \# ...
  end
end

1
2
3
4

import PexelsDotNetSDK.Api;

var pexelsClient \= new PexelsClient("YOUR\_API\_KEY");
var result \= await pexelsClient.GetCollectionAsync(id: "9mp14cx", pageSize: 15);

Example Response

Copy

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160

{
  "id": "9mp14cx",
  "media": \[
    {
      "type": "Photo",
      "id": 2061057,
      "width": 4850,
      "height": 3224,
      "url": "https://www.pexels.com/photo/gray-and-white-kitten-on-white-bed-2061057/",
      "photographer": "Tranmautritam",
      "photographer\_url": "https://www.pexels.com/@tranmautritam",
      "photographer\_id": 8509,
      "avg\_color": "#BBBEC3",
      "src": {
        "original": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg",
        "large2x": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
      },
      "liked": false
    },
    {
      "type": "Video",
      "id": 854982,
      "width": 1280,
      "height": 720,
      "duration": 11,
      "full\_res": null,
      "tags": \[\],
      "url": "https://www.pexels.com/video/video-of-a-tabby-cat-854982/",
      "image": "https://images.pexels.com/videos/854982/free-video-854982.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "avg\_color": null,
      "user": {
        "id": 2659,
        "name": "Pixabay",
        "url": "https://www.pexels.com/@pixabay"
      },
      "video\_files": \[
        {
          "id": 17755,
          "quality": "hd",
          "file\_type": "video/mp4",
          "width": 1280,
          "height": 720,
          "link": "https://player.vimeo.com/external/199433617.hd.mp4?s=1770018c20604d41d60e4f574e7680a1bd15edb8&profile\_id=174&oauth2\_token\_id=57447761"
        },
        {
          "id": 17756,
          "quality": "sd",
          "file\_type": "video/mp4",
          "width": 640,
          "height": 360,
          "link": "https://player.vimeo.com/external/199433617.sd.mp4?s=457abd2452a52548b8c02c503a91035ce8a713f0&profile\_id=164&oauth2\_token\_id=57447761"
        },
        {
          "id": 17757,
          "quality": "sd",
          "file\_type": "video/mp4",
          "width": 960,
          "height": 540,
          "link": "https://player.vimeo.com/external/199433617.sd.mp4?s=457abd2452a52548b8c02c503a91035ce8a713f0&profile\_id=165&oauth2\_token\_id=57447761"
        },
        {
          "id": 17758,
          "quality": "hls",
          "file\_type": "video/mp4",
          "width": null,
          "height": null,
          "link": "https://player.vimeo.com/external/199433617.m3u8?s=115ec8875069ea6203ddca51dae78cebd934b86e&oauth2\_token\_id=57447761"
        }
      \],
      "video\_pictures": \[
        {
          "id": 19591,
          "nr": 0,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-0.jpg"
        },
        {
          "id": 19592,
          "nr": 1,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-1.jpg"
        },
        {
          "id": 19593,
          "nr": 2,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-2.jpg"
        },
        {
          "id": 19594,
          "nr": 3,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-3.jpg"
        },
        {
          "id": 19595,
          "nr": 4,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-4.jpg"
        },
        {
          "id": 19596,
          "nr": 5,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-5.jpg"
        },
        {
          "id": 19597,
          "nr": 6,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-6.jpg"
        },
        {
          "id": 19598,
          "nr": 7,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-7.jpg"
        },
        {
          "id": 19599,
          "nr": 8,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-8.jpg"
        },
        {
          "id": 19600,
          "nr": 9,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-9.jpg"
        },
        {
          "id": 19601,
          "nr": 10,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-10.jpg"
        },
        {
          "id": 19602,
          "nr": 11,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-11.jpg"
        },
        {
          "id": 19603,
          "nr": 12,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-12.jpg"
        },
        {
          "id": 19604,
          "nr": 13,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-13.jpg"
        },
        {
          "id": 19605,
          "nr": 14,
          "picture": "https://images.pexels.com/videos/854982/pictures/preview-14.jpg"
        }
      \]
    }
  \],
  "page": 2,
  "per\_page": 2,
  "total\_results": 6,
  "next\_page": "https://api.pexels.com/v1/collections/9mp14cx/?page=3&per\_page=2",
  "prev\_page": "https://api.pexels.com/v1/collections/9mp14cx/?page=1&per\_page=2"
}

[

## Changelog

](#changelog)

This is a list of major changes to the Pexels API.

#### 2023-11-22

-   Added `sort` query parameter to the `/collections/:id` endpoint.

#### 2022-09-15

-   Added `video_file.fps` attribute for the `Video` resource.

#### 2021-12-14

-   Added `alt` attribute to the `Photo` resource.
-   Added previously-exposed `liked` attribute to the `Photo` responses.

#### 2021-09-13

-   Updated `image` attribute for the `Video` resource to use the correct orientation.
-   Updated `video_picture.picture` attribute for the `Video` resource to use the correct orientation.

#### 2021-08-12

-   Added Featured Collections endpoint.
-   Updated `/collections/:id`. Returns a collection if the collection is `featured` or belongs to the authenticated user.

#### 2021-04-19

-   Added Collections resource and endpoints.

#### 2020-12-11

-   Added `avg_color` attribute to the Photo resource.

#### 2020-11-12

-   Added `orientation`, `size` and `color` filters to Photo Search.
-   Added `orientation` and `size` filters to Video Search.

#### 2020-05-28

-   Initial version of this documentation.

Loading…

Choose your language: ![](https://static.pexels.com/0/assets/flags/en-US-9ac49f52fbe3cc86ef500da8d7dfac4468c0e98419808425a9cdc1af7714cee1.png) English [![](https://static.pexels.com/0/assets/flags/pt-BR-c82ac863624ddcc72073c9b7e01f500fa111a7ce9819999f14d34ba168de7e26.png) Português ](https://www.pexels.com/pt-br/api/documentation/)[![](https://static.pexels.com/0/assets/flags/es-ES-a4ae8ec2d8dac3e76e39948478c1063f94577bd28f5109a708824d3c33cd6c14.png) Español ](https://www.pexels.com/es-es/api/documentation/)[![](https://static.pexels.com/0/assets/flags/ca-ES-ca90d0094b6db09e9b15a972981decae8f1e28f633d79726bc316fbfd5fa3a89.png) Català ](https://www.pexels.com/ca-es/api/documentation/)[![](https://static.pexels.com/0/assets/flags/de-DE-be3be524c1fce804f942bf1c15b700fa6c5cdec93e636b907d58e65907ab911f.png) Deutsch ](https://www.pexels.com/de-de/api/documentation/)[![](https://static.pexels.com/0/assets/flags/it-IT-cae1605e1d85ceafe70f75722fc677d7f14687330c1793e2871ce585c5d5ae81.png) Italiano ](https://www.pexels.com/it-it/api/documentation/)[![](https://static.pexels.com/0/assets/flags/fr-FR-d61749397863383a0fcbbe0daf323ad21de409c46051ffa0e38fb1de92981f1b.png) Français ](https://www.pexels.com/fr-fr/api/documentation/)[![](https://static.pexels.com/0/assets/flags/sv-SE-084f80b0c2a27b0b2581295db55bb4a7c65cb0f685512dc85debd1bc790ff62f.png) Svenska ](https://www.pexels.com/sv-se/api/documentation/)[![](https://static.pexels.com/0/assets/flags/id-ID-e3486a7f251765855c482ac65ebf4355f8a350ae057f37d18b2f79902e7f0942.png) Bahasa Indonesia ](https://www.pexels.com/id-id/api/documentation/)[![](https://static.pexels.com/0/assets/flags/pl-PL-a291e70155493284072aac3eacdf62d26650c6ab949d93cc02c50e597303f524.png) Polski ](https://www.pexels.com/pl-pl/api/documentation/)[![](https://static.pexels.com/0/assets/flags/ja-JP-a42ee70ceb109d1c61637fcfd79518c63883136fcebac1d56c640e2be49f92b6.png) 日本語 ](https://www.pexels.com/ja-jp/api/documentation/)[![](https://static.pexels.com/0/assets/flags/zh-TW-c2cd200f5cc48cb9a4f80b6603452202eb027129b2aa47318fb56babe2d5ffbb.png) 繁體中文 ](https://www.pexels.com/zh-tw/api/documentation/)[![](https://static.pexels.com/0/assets/flags/zh-CN-b4892771a9e714a68706d5b5e49a9b004c2689dfd0841ef6413c6293e26cbf7c.png) 简体中文 ](https://www.pexels.com/zh-cn/api/documentation/)[![](https://static.pexels.com/0/assets/flags/ko-KR-a2fe5930f352586f5a1c6f2c05eb7b7acb257dfc809ee93ab0a4df8a0c908e77.png) 한국어 ](https://www.pexels.com/ko-kr/api/documentation/)[![](https://static.pexels.com/0/assets/flags/th-TH-472db9a3448d06b8da155074a3a9c61d27e64b8d6260945ae452f03d0b33fff0.png) ภาษาไทย ](https://www.pexels.com/th-th/api/documentation/)[![](https://static.pexels.com/0/assets/flags/nl-NL-742c406a7d380e612f522c1817a1e0bbf203db5f971a8907e62ccd3f832a38c2.png) Nederlands ](https://www.pexels.com/nl-nl/api/documentation/)[![](https://static.pexels.com/0/assets/flags/hu-HU-0185080072ce7bf370d1997dcfb24d04802752d00565922c6a74ea6ebcb004a3.png) Magyar ](https://www.pexels.com/hu-hu/api/documentation/)[![](https://static.pexels.com/0/assets/flags/vi-VN-b1757b6572fde85b1f0f5abcfc6aa52a317ece4a3b88b8f238cc45c5564b3499.png) Tiếng Việt ](https://www.pexels.com/vi-vn/api/documentation/)[![](https://static.pexels.com/0/assets/flags/cs-CZ-b41c0502e538d211790c81cc2ad4b64d83d006b597b0ff241adf741b1bc5f4bd.png) Čeština ](https://www.pexels.com/cs-cz/api/documentation/)[![](https://static.pexels.com/0/assets/flags/da-DK-b4ace2091247fdafe4632319f53d409c30356b310a06ecdd5cccc22442fb90f9.png) Dansk ](https://www.pexels.com/da-dk/api/documentation/)[![](https://static.pexels.com/0/assets/flags/fi-FI-61d98f399f4a3d2d9b6e6bacd09e511d790573fa8f2b79fb6b9f87ddf984f88f.png) Suomi ](https://www.pexels.com/fi-fi/api/documentation/)[![](https://static.pexels.com/0/assets/flags/uk-UA-2c1a4f2a37296ca95fb5d7925ff32c25a9a6f1396f7796600d3d85c92027caab.png) Українська ](https://www.pexels.com/uk-ua/api/documentation/)[![](https://static.pexels.com/0/assets/flags/el-GR-ddde996eb1320b4a08a745a5e6e7af05617d73c6dc9f454df03924d49e4280d5.png) Ελληνικά ](https://www.pexels.com/el-gr/api/documentation/)[![](https://static.pexels.com/0/assets/flags/ro-RO-ee95367de66f700abc7c054a5baca1287a83eb5fc9e72dea3bd0424877fa4777.png) Română ](https://www.pexels.com/ro-ro/api/documentation/)[![](https://static.pexels.com/0/assets/flags/nb-NO-1794d8e293c51b48aee94d3759c733461825bab5db18e022a1d069cf00ada332.png) Norsk ](https://www.pexels.com/nb-no/api/documentation/)[![](https://static.pexels.com/0/assets/flags/sk-SK-b74ff90bcb3d51b59e0be123140fe4e7bf22b6913777fa1b59dc5b34c10ad121.png) Slovenčina ](https://www.pexels.com/sk-sk/api/documentation/)[![](https://static.pexels.com/0/assets/flags/tr-TR-ffcb46f7290aa636a53ab57a6dd27f8918046c9371b018486c1c63a8ebd6a463.png) Türkçe ](https://www.pexels.com/tr-tr/api/documentation/)[![](https://static.pexels.com/0/assets/flags/ru-RU-95c9aa90687ba690ada7173b898561d1bdde41742b76b28c396255f2f200fe98.png) Русский](https://www.pexels.com/ru-ru/api/documentation/) ✕

To improve your user experience we use [cookies](/privacy-policy/). Ok

Follow Donate

Free Download

### Choose a size:

-   
-   
-   
-   
-    **Custom Size** 

### Free Download

<iframe allowfullscreen="" class="js-photo-page-video-iframe" frameborder="0" mozallowfullscreen="" src="" style="" webkitallowfullscreen=""></iframe>

Photographer

Follow Donate

<script type="application/ld+json">{"@context":"http://schema.org","@type":"WebSite","url":"https://www.pexels.com/","potentialAction":{"@type":"SearchAction","target":"https://www.pexels.com/search/{search_term_string}/","query-input":"required name=search_term_string"}}</script> <script type="application/ld+json">{"@context":"http://schema.org","@type":"Organization","name":"Pexels","url":"https://www.pexels.com","logo":"https://static.pexels.com/0/assets/pexels-logo-7e4af4630e66b6b786567041874586aeb1b5217589035c70a0def15aacd0f11a.png","sameAs":["https://www.facebook.com/pexels","https://twitter.com/pexels","https://www.pinterest.com/pexels/", "https://instagram.com/pexels/"]}</script>

## Embedded Content