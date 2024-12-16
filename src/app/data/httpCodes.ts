// src/data/httpCodes.ts
// src/data/httpCodes.ts

export interface HttpCode {
  code: number;
  title: string;
  description: string;
  category: "informational" | "success" | "redirection" | "clientError" | "serverError";
  spec: string;
  mdn?: string;
  details?: string;
  examples?: string[];
  commonUses?: string[];
  bestPractices?: string[];
}

export const httpCodes: HttpCode[] = [
  {
    code: 100,
    title: "Continue",
    description: "The server has received the request headers and the client should proceed to send the request body.",
    category: "informational",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100",
    details:
      "This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.",
    examples: [
      "Large file uploads with preliminary header checks",
      "Complex multi-step API requests",
      "Streaming data transfers",
    ],
    commonUses: ["File upload systems", "Media streaming services", "Large data transfer operations"],
    bestPractices: [
      "Only use when explicitly handling large payload transfers",
      "Ensure proper client support before implementing",
      "Consider alternative approaches for simple requests",
    ],
  },
  {
    code: 200,
    title: "OK",
    description: "The request has succeeded.",
    category: "success",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200",
    details:
      "The 200 OK status code indicates that the request has succeeded. The meaning of the success depends on the HTTP method: GET (resource found and transmitted), POST (resource created/updated), PUT/PATCH (resource updated), DELETE (resource deleted).",
    examples: [
      "Successful GET request to fetch user profile",
      "Successful API call returning data",
      "Webpage loading correctly",
    ],
    commonUses: ["API responses with requested data", "Successful webpage loads", "Successful form submissions"],
    bestPractices: [
      "Include appropriate response body with useful data",
      "Set correct Content-Type header",
      "Use appropriate caching headers",
    ],
  },
  {
    code: 201,
    title: "Created",
    description: "The request has been fulfilled and resulted in a new resource being created.",
    category: "success",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201",
    details:
      "The 201 status code indicates that the request has been fulfilled and has resulted in one or more new resources being created. The primary resource created by the request is identified by either a Location header field in the response or, if no Location field is received, by the effective request URI.",
    examples: ["Creating a new user account", "Uploading a new file", "Adding a new blog post"],
    commonUses: ["POST requests creating new resources", "User registration endpoints", "File upload systems"],
    bestPractices: [
      "Include Location header with URI of new resource",
      "Return representation of created resource",
      "Use appropriate response body structure",
    ],
  },
  {
    code: 202,
    title: "Accepted",
    description: "The request has been accepted for processing, but the processing has not been completed.",
    category: "success",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202",
    details:
      "The 202 status code indicates that the request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.",
    examples: ["Asynchronous processing", "Background tasks", "Queued requests"],
    commonUses: ["Background processing tasks", "Queued requests", "Long-running operations"],
    bestPractices: [
      "Provide feedback on request status",
      "Include Location header for resource if applicable",
      "Use appropriate response body structure",
    ],
  },
  {
    code: 203,
    title: "Non-Authoritative Information",
    description:
      "The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK response to satisfy a previous request.",
    category: "success",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203",
    details:
      "The 203 status code indicates that the request has been successfully processed, but is not returning the entire resource representation so that other parties can use the same input data.",
    examples: ["Web accelerators", "Caching proxies", "Data transformation services"],
    commonUses: ["Caching systems", "Data transformation services", "Web accelerators"],
    bestPractices: [
      "Use when partial content is acceptable",
      "Include ETag header for caching purposes",
      "Consider using 204 No Content for more efficient responses",
    ],
  },
  {
    code: 204,
    title: "No Content",
    description: "The server has successfully fulfilled the request and there is no additional content to send.",
    category: "success",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204",
    details:
      "The 204 status code indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response body.",
    examples: ["API responses with no data", "Successful form submissions", "Resource updates without data"],
    commonUses: ["API responses with no data", "Successful form submissions", "Resource updates without data"],
    bestPractices: [
      "Use when no content is returned",
      "Consider using 200 OK with empty body for more clarity",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 205,
    title: "Reset Content",
    description:
      "The server has fulfilled the request and the user agent should reset the document view which caused the request to be sent.",
    category: "success",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205",
    details:
      "The 205 status code indicates that the server has fulfilled the request and that the user agent should reset the document view which caused the request to be sent.",
    examples: ["Form submissions", "Resource updates", "Page reloads"],
    commonUses: ["Form submissions", "Resource updates", "Page reloads"],
    bestPractices: [
      "Use when a form is successfully submitted",
      "Ensure proper caching headers are set",
      "Consider using 204 No Content for more efficient responses",
    ],
  },
  {
    code: 206,
    title: "Partial Content",
    description: "The server has fulfilled the partial GET request for the resource.",
    category: "success",
    spec: "RFC 7233",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206",
    details: "The 206 status code indicates that the server has fulfilled the partial GET request for the resource.",
    examples: ["Streaming media", "Large file downloads", "Partial updates to resources"],
    commonUses: ["Streaming media", "Large file downloads", "Partial updates to resources"],
    bestPractices: [
      "Use when only a portion of the resource is returned",
      "Include Content-Range header for partial content",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 300,
    title: "Multiple Choices",
    description: "The request has more than one possible responses.",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300",
    details:
      "The 300 status code indicates that the request has more than one possible responses. The user agent or user should choose one of them. There is no standardized way to choose one of the responses, but HTML links to the different choices are suggested.",
    examples: ["URL redirection", "Choosing a new version of a resource", "Choosing a language"],
    commonUses: ["URL redirection", "Choosing a new version of a resource", "Choosing a language"],
    bestPractices: [
      "Provide multiple options for the user to choose from",
      "Use appropriate response body structure",
      "Consider using 301 Moved Permanently for more permanent redirects",
    ],
  },
  {
    code: 301,
    title: "Moved Permanently",
    description: "The requested resource has been permanently moved to a new URL.",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301",
    details: "The 301 status code indicates that the requested resource has been permanently moved to a new URL.",
    examples: ["URL redirection", "Resource migration", "Domain changes"],
    commonUses: ["URL redirection", "Resource migration", "Domain changes"],
    bestPractices: [
      "Use when the resource has been permanently moved",
      "Include Location header with new URL",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 302,
    title: "Found",
    description: "The requested resource resides temporarily under a different URI.",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302",
    details: "The 302 status code indicates that the requested resource resides temporarily under a different URI.",
    examples: ["Temporary URL redirection", "Resource migration", "Domain changes"],
    commonUses: ["Temporary URL redirection", "Resource migration", "Domain changes"],
    bestPractices: [
      "Use when the resource is temporarily moved",
      "Include Location header with new URL",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 303,
    title: "See Other",
    description:
      "The response to the request can be found under a different URI and should be retrieved using a GET method on that resource.",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303",
    details:
      "The 303 status code indicates that the response to the request can be found under a different URI and should be retrieved using a GET method on that resource.",
    examples: ["API redirects", "Resource migration", "Domain changes"],
    commonUses: ["API redirects", "Resource migration", "Domain changes"],
    bestPractices: [
      "Use when the resource is temporarily moved",
      "Include Location header with new URL",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 304,
    title: "Not Modified",
    description:
      "Indicates that the resource has not been modified since the version specified by the request headers.",
    category: "redirection",
    spec: "RFC 7232",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304",
    details:
      "The 304 status code indicates that the resource has not been modified since the version specified by the request headers.",
    examples: ["Caching mechanisms", "Conditional GET requests", "Resource version control"],
    commonUses: ["Caching mechanisms", "Conditional GET requests", "Resource version control"],
    bestPractices: [
      "Use when the resource has not changed",
      "Ensure proper caching headers are set",
      "Consider using 301 Moved Permanently for more permanent redirects",
    ],
  },
  {
    code: 305,
    title: "Use Proxy",
    description: "The requested resource must be accessed through the proxy given by the Location field.",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/305",
    details:
      "The 305 status code indicates that the requested resource must be accessed through the proxy given by the Location field.",
    examples: ["Proxied resources", "Resource migration", "Domain changes"],
    commonUses: ["Proxied resources", "Resource migration", "Domain changes"],
    bestPractices: [
      "Use when the resource is temporarily moved",
      "Include Location header with new URL",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 306,
    title: "Switch Proxy",
    description: "No longer used. Originally meant 'Subsequent requests should use the same URI as the first request.'",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/306",
    details:
      "The 306 status code was used in the past to indicate that the requested resource should be accessed through a different proxy than the one used in the first request. However, this status code is no longer used and is reserved for future use.",
    examples: [],
    commonUses: [],
    bestPractices: [],
  },
  {
    code: 307,
    title: "Temporary Redirect",
    description: "The requested resource resides temporarily under a different URI.",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307",
    details: "The 307 status code indicates that the requested resource resides temporarily under a different URI.",
    examples: ["Temporary URL redirection", "Resource migration", "Domain changes"],
    commonUses: ["Temporary URL redirection", "Resource migration", "Domain changes"],
    bestPractices: [
      "Use when the resource is temporarily moved",
      "Include Location header with new URL",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 308,
    title: "Permanent Redirect",
    description: "The requested resource has been permanently moved to a new URI.",
    category: "redirection",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308",
    details: "The 308 status code indicates that the requested resource has been permanently moved to a new URI.",
    examples: ["Resource migration", "Domain changes"],
    commonUses: ["Resource migration", "Domain changes"],
    bestPractices: [
      "Use when the resource has been permanently moved",
      "Include Location header with new URL",
      "Ensure proper caching headers are set",
    ],
  },
  {
    code: 400,
    title: "Bad Request",
    description:
      "The server cannot or will not process the request due to something that is perceived to be a client error.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
    details:
      "The 400 status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
    examples: ["Invalid syntax", "Missing required fields", "Invalid data formats"],
    commonUses: ["API requests with invalid input", "Form submissions with errors", "Invalid requests to web pages"],
    bestPractices: [
      "Validate client input server-side",
      "Provide helpful error messages",
      "Use appropriate response body structure",
    ],
  },
  {
    code: 401,
    title: "Unauthorized",
    description: "The request requires user authentication.",
    category: "clientError",
    spec: "RFC 7235",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401",
    details:
      "The 401 status code indicates that the request requires user authentication. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource.",
    examples: ["Accessing protected resources", "API requests requiring authentication"],
    commonUses: ["API requests requiring authentication", "Protected resources"],
    bestPractices: [
      "Use when authentication is required",
      "Include WWW-Authenticate header with authentication details",
      "Ensure proper authentication mechanisms are in place",
    ],
  },
  {
    code: 402,
    title: "Payment Required",
    description: "Reserved for future use.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402",
    details: "The 402 status code is reserved for future use. It is not used by any current HTTP standards bodies.",
    examples: [],
    commonUses: [],
    bestPractices: [],
  },
  {
    code: 403,
    title: "Forbidden",
    description: "The server understood the request, but is refusing to fulfill it.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403",
    details:
      "The 403 status code indicates that the server understood the request but refuses to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.",
    examples: ["Accessing protected resources", "API requests with insufficient permissions"],
    commonUses: ["API requests with insufficient permissions", "Protected resources"],
    bestPractices: [
      "Use when access is denied",
      "Include a detailed error message",
      "Ensure proper authentication and authorization mechanisms are in place",
    ],
  },
  {
    code: 404,
    title: "Not Found",
    description: "The server cannot find the requested resource.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
    details:
      "The 404 error status code indicates that the server can't find the requested resource. Links that lead to a 404 page are often called broken or dead links and can be a significant issue for a website's user experience and SEO.",
    examples: ["Accessing a deleted page", "Mistyped URL", "Broken links to resources"],
    commonUses: ["Missing webpage handling", "Deleted resource requests", "Invalid API endpoints"],
    bestPractices: [
      "Provide helpful error messages",
      "Include navigation options to valid pages",
      "Monitor and fix broken links regularly",
    ],
  },
  {
    code: 405,
    title: "Method Not Allowed",
    description: "The request method is not supported for the requested resource.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405",
    details:
      "The 405 status code indicates that the request method is not supported for the requested resource. The response must include an Allow header containing a list of valid methods for the requested resource.",
    examples: ["Accessing a resource with an unsupported HTTP method", "API requests with invalid methods"],
    commonUses: ["API requests with invalid methods", "Unsupported resource access"],
    bestPractices: [
      "Use when the requested method is not supported",
      "Include Allow header with supported methods",
      "Ensure proper routing and resource configuration",
    ],
  },
  {
    code: 406,
    title: "Not Acceptable",
    description:
      "The server cannot generate a response matching the list of acceptable values defined in the request headers.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406",
    details:
      "The 406 status code indicates that the server cannot generate a response matching the list of acceptable values defined in the request headers.",
    examples: ["API requests with unsupported media types", "Web page requests with unsupported content types"],
    commonUses: ["API requests with unsupported media types", "Web page requests with unsupported content types"],
    bestPractices: [
      "Use when the requested resource is not acceptable",
      "Include Accept-Ranges header if range requests are supported",
      "Ensure proper content negotiation mechanisms are in place",
    ],
  },
  {
    code: 407,
    title: "Proxy Authentication Required",
    description: "The client must first authenticate itself with the proxy.",
    category: "clientError",
    spec: "RFC 7235",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407",
    details: "The 407 status code indicates that the client must first authenticate itself with the proxy.",
    examples: ["Accessing protected resources through a proxy", "API requests requiring proxy authentication"],
    commonUses: ["API requests requiring proxy authentication", "Protected resources through a proxy"],
    bestPractices: [
      "Use when authentication is required through a proxy",
      "Include Proxy-Authenticate header with authentication details",
      "Ensure proper authentication mechanisms are in place",
    ],
  },
  {
    code: 408,
    title: "Request Timeout",
    description: "The server did not receive a complete request message within the time that it was prepared to wait.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408",
    details:
      "The 408 status code indicates that the server did not receive a complete request message within the time that it was prepared to wait.",
    examples: ["Slow network connections", "Long-running requests", "API requests with timeout limits"],
    commonUses: ["Slow network connections", "Long-running requests", "API requests with timeout limits"],
    bestPractices: [
      "Use when the request takes too long to complete",
      "Include Retry-After header with a recommended waiting time",
      "Ensure proper request handling and timeout settings",
    ],
  },
  {
    code: 409,
    title: "Conflict",
    description: "The request could not be completed due to a conflict with the current state of the resource.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409",
    details:
      "The 409 status code indicates that the request could not be completed due to a conflict with the current state of the resource.",
    examples: ["Updating a resource with conflicting data", "Creating a resource with a duplicate identifier"],
    commonUses: ["Updating a resource with conflicting data", "Creating a resource with a duplicate identifier"],
    bestPractices: [
      "Use when the request conflicts with the current state of the resource",
      "Include a detailed error message",
      "Ensure proper resource versioning and conflict resolution mechanisms are in place",
    ],
  },
  {
    code: 410,
    title: "Gone",
    description: "The requested resource is no longer available and will not be available again.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410",
    details:
      "The 410 status code indicates that the requested resource is no longer available and will not be available again.",
    examples: ["Deleted resources", "Expired content", "Resource migration"],
    commonUses: ["Deleted resources", "Expired content", "Resource migration"],
    bestPractices: [
      "Use when the resource is permanently removed",
      "Include a detailed error message",
      "Ensure proper resource versioning and conflict resolution mechanisms are in place",
    ],
  },
  {
    code: 411,
    title: "Length Required",
    description: "The server refuses to accept the request without a defined Content-Length.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411",
    details:
      "The 411 status code indicates that the server refuses to accept the request without a defined Content-Length.",
    examples: ["API requests with missing Content-Length", "Form submissions with missing Content-Length"],
    commonUses: ["API requests with missing Content-Length", "Form submissions with missing Content-Length"],
    bestPractices: [
      "Use when the request requires a Content-Length header",
      "Ensure proper request handling and Content-Length validation",
    ],
  },
  {
    code: 412,
    title: "Precondition Failed",
    description: "The server does not meet one of the preconditions that the requester put on the request.",
    category: "clientError",
    spec: "RFC 7232",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412",
    details:
      "The 412 status code indicates that the server does not meet one of the preconditions that the requester put on the request.",
    examples: ["API requests with missing If-Match header", "Form submissions with missing If-Unmodified-Since header"],
    commonUses: [
      "API requests with missing If-Match header",
      "Form submissions with missing If-Unmodified-Since header",
    ],
    bestPractices: [
      "Use when the request preconditions are not met",
      "Include appropriate precondition headers",
      "Ensure proper resource versioning and conflict resolution mechanisms are in place",
    ],
  },
  {
    code: 413,
    title: "Payload Too Large",
    description: "The request is larger than the server is willing or able to process.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413",
    details: "The 413 status code indicates that the request is larger than the server is willing or able to process.",
    examples: ["Large file uploads", "API requests with large payloads"],
    commonUses: ["Large file uploads", "API requests with large payloads"],
    bestPractices: [
      "Use when the request payload is too large",
      "Include a detailed error message",
      "Consider implementing chunked transfer encoding",
    ],
  },
  {
    code: 414,
    title: "URI Too Long",
    description: "The URI provided was too long for the server to process.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414",
    details: "The 414 status code indicates that the URI provided was too long for the server to process.",
    examples: ["Long URLs", "API requests with overly complex URIs"],
    commonUses: ["Long URLs", "API requests with overly complex URIs"],
    bestPractices: [
      "Use when the URI is too long",
      "Include a detailed error message",
      "Consider implementing URL shortening or parameter optimization",
    ],
  },
  {
    code: 415,
    title: "Unsupported Media Type",
    description: "The server does not support the media type of the requested resource.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415",
    details: "The 415 status code indicates that the server does not support the media type of the requested resource.",
    examples: ["API requests with unsupported media types", "Web page requests with unsupported content types"],
    commonUses: ["API requests with unsupported media types", "Web page requests with unsupported content types"],
    bestPractices: [
      "Use when the requested resource has an unsupported media type",
      "Include a detailed error message",
      "Ensure proper content negotiation mechanisms are in place",
    ],
  },
  {
    code: 416,
    title: "Range Not Satisfiable",
    description: "The server cannot satisfy the request range.",
    category: "clientError",
    spec: "RFC 7233",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416",
    details:
      "The 416 status code indicates that the server cannot satisfy the request range. This is often returned when the range specified in the request is not supported by the server.",
    examples: ["Requesting a range that is not available", "API requests with invalid range headers"],
    commonUses: ["API requests with invalid range headers", "Requesting a range that is not available"],
    bestPractices: [
      "Use when the requested range is not supported",
      "Include a detailed error message",
      "Ensure proper range handling and validation",
    ],
  },
  {
    code: 417,
    title: "Expectation Failed",
    description: "The server cannot meet the requirements of the Expect header.",
    category: "clientError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417",
    details: "The 417 status code indicates that the server cannot meet the requirements of the Expect header.",
    examples: ["API requests with invalid Expect headers", "Form submissions with invalid Expect headers"],
    commonUses: ["API requests with invalid Expect headers", "Form submissions with invalid Expect headers"],
    bestPractices: [
      "Use when the request Expect header is not met",
      "Include a detailed error message",
      "Ensure proper request handling and Expect header validation",
    ],
  },
  {
    code: 418,
    title: "I'm a teapot",
    description:
      "This code was defined in 1998 as a joke, in reference to the incorrect HTTP status code for tea pots.",
    category: "clientError",
    spec: "RFC 2324",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418",
    details:
      "The 418 status code is a joke status code that was defined in 1998 as a reference to the incorrect HTTP status code for tea pots.",
    examples: [],
    commonUses: [],
    bestPractices: [],
  },
  {
    code: 421,
    title: "Misdirected Request",
    description: "The request was directed at a server that is not able to produce a response.",
    category: "clientError",
    spec: "RFC 7540",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421",
    details:
      "The 421 status code indicates that the request was directed at a server that is not able to produce a response.",
    examples: ["API requests with invalid Host headers", "Web page requests with invalid Host headers"],
    commonUses: ["API requests with invalid Host headers", "Web page requests with invalid Host headers"],
    bestPractices: [
      "Use when the request Host header is invalid",
      "Include a detailed error message",
      "Ensure proper Host header validation",
    ],
  },
  {
    code: 422,
    title: "Unprocessable Entity",
    description: "The request was well-formed but was unable to be followed due to semantic errors.",
    category: "clientError",
    spec: "RFC 4918",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422",
    details:
      "The 422 status code indicates that the request was well-formed but was unable to be followed due to semantic errors.",
    examples: ["API requests with invalid JSON", "Form submissions with missing required fields"],
    commonUses: ["API requests with invalid JSON", "Form submissions with missing required fields"],
    bestPractices: [
      "Use when the request is well-formed but contains semantic errors",
      "Include a detailed error message",
      "Ensure proper request validation and error handling",
    ],
  },
  {
    code: 423,
    title: "Locked",
    description: "The resource that is being accessed is locked.",
    category: "clientError",
    spec: "RFC 4918",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423",
    details:
      "The 423 status code indicates that the resource that is being accessed is locked. This is often returned when a resource is being edited by another process.",
    examples: [
      "API requests to edit a resource that is being edited by another process",
      "Web page requests to edit a resource that is being edited by another process",
    ],
    commonUses: [
      "API requests to edit a resource that is being edited by another process",
      "Web page requests to edit a resource that is being edited by another process",
    ],
    bestPractices: [
      "Use when the resource is locked",
      "Include a detailed error message",
      "Ensure proper resource locking and conflict resolution mechanisms are in place",
    ],
  },
  {
    code: 424,
    title: "Failed Dependency",
    description: "The request failed due to a failure of a previous request.",
    category: "clientError",
    spec: "RFC 4918",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424",
    details: "The 424 status code indicates that the request failed due to a failure of a previous request.",
    examples: ["API requests with missing dependencies", "Form submissions with missing dependencies"],
    commonUses: ["API requests with missing dependencies", "Form submissions with missing dependencies"],
    bestPractices: [
      "Use when the request failed due to a failure of a previous request",
      "Include a detailed error message",
      "Ensure proper request handling and dependency validation",
    ],
  },
  {
    code: 425,
    title: "Too Early",
    description: "The server is unwilling to risk processing a request too early.",
    category: "clientError",
    spec: "RFC 8470",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425",
    details:
      "The 425 status code indicates that the server is unwilling to risk processing a request too early. This is often returned when a client attempts to resume a request that was interrupted by a network error.",
    examples: ["API requests with network errors", "Web page requests with network errors"],
    commonUses: ["API requests with network errors", "Web page requests with network errors"],
    bestPractices: [
      "Use when the request is too early",
      "Include a detailed error message",
      "Ensure proper request handling and network error detection",
    ],
  },
  {
    code: 426,
    title: "Upgrade Required",
    description:
      "The server refuses to perform the request using the current protocol that is being used on the client.",
    category: "clientError",
    spec: "RFC 2817",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426",
    details:
      "The 426 status code indicates that the server refuses to perform the request using the current protocol that is being used on the client.",
    examples: ["API requests with unsupported protocols", "Web page requests with unsupported protocols"],
    commonUses: ["API requests with unsupported protocols", "Web page requests with unsupported protocols"],
    bestPractices: [
      "Use when the client is using an unsupported protocol",
      "Include a detailed error message",
      "Ensure proper protocol negotiation and upgrade mechanisms are in place",
    ],
  },
  {
    code: 428,
    title: "Precondition Required",
    description: "The origin server requires the request to be conditional.",
    category: "clientError",
    spec: "RFC 6585",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428",
    details:
      "The 428 status code indicates that the origin server requires the request to be conditional. This is often returned when a client attempts to access a resource that requires authentication or other preconditions.",
    examples: [
      "API requests with missing If-Match headers",
      "Form submissions with missing If-Unmodified-Since headers",
    ],
    commonUses: [
      "API requests with missing If-Match headers",
      "Form submissions with missing If-Unmodified-Since headers",
    ],
    bestPractices: [
      "Use when the request requires a precondition",
      "Include appropriate precondition headers",
      "Ensure proper resource versioning and conflict resolution mechanisms are in place",
    ],
  },
  {
    code: 429,
    title: "Too Many Requests",
    description: "The user has sent too many requests in a given amount of time.",
    category: "clientError",
    spec: "RFC 6585",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429",
    details:
      "The 429 status code indicates that the user has sent too many requests in a given amount of time. This is often returned when a client attempts to access a resource too frequently.",
    examples: ["API requests with too many requests", "Web page requests with too many requests"],
    commonUses: ["API requests with too many requests", "Web page requests with too many requests"],
    bestPractices: [
      "Use when the user has sent too many requests",
      "Include a detailed error message",
      "Ensure proper rate limiting and request throttling mechanisms are in place",
    ],
  },
  {
    code: 431,
    title: "Request Header Fields Too Large",
    description: "The server is unwilling to process the request because its header fields are too large.",
    category: "clientError",
    spec: "RFC 6585",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431",
    details:
      "The 431 status code indicates that the server is unwilling to process the request because its header fields are too large.",
    examples: ["API requests with large header fields", "Web page requests with large header fields"],
    commonUses: ["API requests with large header fields", "Web page requests with large header fields"],
    bestPractices: [
      "Use when the request header fields are too large",
      "Include a detailed error message",
      "Ensure proper request handling and header field validation",
    ],
  },
  {
    code: 451,
    title: "Unavailable For Legal Reasons",
    description: "The server is unable to process the request due to legal reasons.",
    category: "clientError",
    spec: "RFC 7725",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451",
    details:
      "The 451 status code indicates that the server is unable to process the request due to legal reasons. This is often returned when a client attempts to access a resource that is restricted by law.",
    examples: ["API requests with restricted access", "Web page requests with restricted access"],
    commonUses: ["API requests with restricted access", "Web page requests with restricted access"],
    bestPractices: [
      "Use when the request is restricted by legal reasons",
      "Include a detailed error message",
      "Ensure proper request handling and legal compliance",
    ],
  },

  {
    code: 500,
    title: "Internal Server Error",
    description: "The server has encountered a situation it does not know how to handle.",
    category: "serverError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
    details:
      "The 500 status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request. This is a generic error response when no other specific 5xx error is suitable.",
    examples: ["Database connection failures", "Unhandled exceptions in server code", "Server configuration issues"],
    commonUses: ["Generic server-side error handling", "Unexpected runtime errors", "System overload situations"],
    bestPractices: [
      "Log detailed error information server-side",
      "Provide generic error message to users",
      "Implement proper error monitoring",
    ],
  },
  {
    code: 501,
    title: "Not Implemented",
    description: "The server does not support the functionality required to fulfill the request.",
    category: "serverError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501",
    details:
      "The 501 status code indicates that the server does not support the functionality required to fulfill the request. This is often returned when a client attempts to access a resource that is not supported by the server.",
    examples: ["API requests with unsupported functionality", "Web page requests with unsupported functionality"],
    commonUses: ["API requests with unsupported functionality", "Web page requests with unsupported functionality"],
    bestPractices: [
      "Use when the server does not support the functionality required to fulfill the request",
      "Include a detailed error message",
      "Ensure proper server configuration and feature detection",
    ],
  },
  {
    code: 502,
    title: "Bad Gateway",
    description:
      "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
    category: "serverError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502",
    details:
      "The 502 status code indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
    examples: ["API requests with gateway errors", "Web page requests with gateway errors"],
    commonUses: ["API requests with gateway errors", "Web page requests with gateway errors"],
    bestPractices: [
      "Use when the server received an invalid response from the upstream server",
      "Include a detailed error message",
      "Ensure proper gateway and proxy configuration",
    ],
  },
  {
    code: 503,
    title: "Service Unavailable",
    description: "The server is currently unable to handle the request due to a temporary overload or maintenance.",
    category: "serverError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503",
    details:
      "The 503 status code indicates that the server is currently unable to handle the request due to a temporary overload or maintenance.",
    examples: ["API requests with service unavailability", "Web page requests with service unavailability"],
    commonUses: ["API requests with service unavailability", "Web page requests with service unavailability"],
    bestPractices: [
      "Use when the server is temporarily unavailable",
      "Include a detailed error message",
      "Ensure proper load balancing and failover mechanisms are in place",
    ],
  },
  {
    code: 504,
    title: "Gateway Timeout",
    description:
      "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.",
    category: "serverError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504",
    details:
      "The 504 status code indicates that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.",
    examples: ["API requests with gateway timeouts", "Web page requests with gateway timeouts"],
    commonUses: ["API requests with gateway timeouts", "Web page requests with gateway timeouts"],
    bestPractices: [
      "Use when the server did not receive a timely response from the upstream server",
      "Include a detailed error message",
      "Ensure proper gateway and proxy configuration",
    ],
  },
  {
    code: 505,
    title: "HTTP Version Not Supported",
    description: "The server does not support the HTTP protocol version used in the request.",
    category: "serverError",
    spec: "RFC 7231",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505",
    details:
      "The 505 status code indicates that the server does not support the HTTP protocol version used in the request. This is often returned when a client attempts to access a resource that is not supported by the server.",
    examples: ["API requests with unsupported HTTP versions", "Web page requests with unsupported HTTP versions"],
    commonUses: ["API requests with unsupported HTTP versions", "Web page requests with unsupported HTTP versions"],
    bestPractices: [
      "Use when the server does not support the HTTP protocol version used in the request",
      "Include a detailed error message",
      "Ensure proper server configuration and protocol support",
    ],
  },
  {
    code: 506,
    title: "Variant Also Negotiates",
    description:
      "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.",
    category: "serverError",
    spec: "RFC 2295",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506",
    details:
      "The 506 status code indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.",
    examples: ["API requests with variant negotiation errors", "Web page requests with variant negotiation errors"],
    commonUses: ["API requests with variant negotiation errors", "Web page requests with variant negotiation errors"],
    bestPractices: [
      "Use when the server has an internal configuration error",
      "Include a detailed error message",
      "Ensure proper server configuration and variant negotiation",
    ],
  },
  {
    code: 507,
    title: "Insufficient Storage",
    description: "The server is unable to store the representation needed to complete the request.",
    category: "serverError",
    spec: "RFC 4918",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507",
    details:
      "The 507 status code indicates that the server is unable to store the representation needed to complete the request. This is often returned when a client attempts to upload a file that is too large to be stored by the server.",
    examples: ["API requests with insufficient storage", "Web page requests with insufficient storage"],
    commonUses: ["API requests with insufficient storage", "Web page requests with insufficient storage"],
    bestPractices: [
      "Use when the server is unable to store the representation needed to complete the request",
      "Include a detailed error message",
      "Ensure proper storage and resource management",
    ],
  },
  {
    code: 508,
    title: "Loop Detected",
    description: "The server detected an infinite loop while processing the request.",
    category: "serverError",
    spec: "RFC 5842",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508",
    details:
      "The 508 status code indicates that the server detected an infinite loop while processing the request. This is often returned when a client attempts to access a resource that is part of a loop.",
    examples: ["API requests with infinite loops", "Web page requests with infinite loops"],
    commonUses: ["API requests with infinite loops", "Web page requests with infinite loops"],
    bestPractices: [
      "Use when the server detected an infinite loop while processing the request",
      "Include a detailed error message",
      "Ensure proper request handling and loop detection",
    ],
  },
  {
    code: 510,
    title: "Not Extended",
    description: "Further extensions to the request are required for the server to fulfill it.",
    category: "serverError",
    spec: "RFC 2774",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510",
    details:
      "The 510 status code indicates that further extensions to the request are required for the server to fulfill it. This is often returned when a client attempts to access a resource that requires additional information or authentication.",
    examples: ["API requests with missing extensions", "Web page requests with missing extensions"],
    commonUses: ["API requests with missing extensions", "Web page requests with missing extensions"],
    bestPractices: [
      "Use when the request requires additional information or authentication",
      "Include a detailed error message",
      "Ensure proper request handling and extension negotiation",
    ],
  },
  {
    code: 511,
    title: "Network Authentication Required",
    description: "The client needs to authenticate to gain network access.",
    category: "serverError",
    spec: "RFC 6585",
    mdn: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511",
    details:
      "The 511 status code indicates that the client needs to authenticate to gain network access. This is often returned when a client attempts to access a resource that requires authentication.",
    examples: [
      "API requests with network authentication required",
      "Web page requests with network authentication required",
    ],
    commonUses: [
      "API requests with network authentication required",
      "Web page requests with network authentication required",
    ],
    bestPractices: [
      "Use when the client needs to authenticate to gain network access",
      "Include a detailed error message",
      "Ensure proper authentication and authorization mechanisms are in place",
    ],
  },
];

// ... rest of the file remains the same

export const getHttpCodesByCategory = (category: HttpCode["category"]) => {
  return httpCodes.filter((code) => code.category === category);
};

export const getSimilarCodes = (code: number) => {
  const currentCode = httpCodes.find((c) => c.code === code);
  if (!currentCode) return [];

  return httpCodes.filter((c) => c.category === currentCode.category && c.code !== code).slice(0, 3);
};

export const categories = {
  informational: {
    name: "Informational",
    description: "Request received, continuing process",
    color: "blue",
  },
  success: {
    name: "Success",
    description: "The action was successfully received, understood, and accepted",
    color: "green",
  },
  redirection: {
    name: "Redirection",
    description: "Further action must be taken in order to complete the request",
    color: "yellow",
  },
  clientError: {
    name: "Client Error",
    description: "The request contains bad syntax or cannot be fulfilled",
    color: "orange",
  },
  serverError: {
    name: "Server Error",
    description: "The server failed to fulfill an apparently valid request",
    color: "red",
  },
};
