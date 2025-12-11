const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","icons/icon-192.svg","icons/icon-512.svg","manifest.webmanifest","offline.html","service-worker.js"]),
	mimeTypes: {".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".html":"text/html"},
	_: {
		client: {start:"_app/immutable/entry/start.DwqH21hD.js",app:"_app/immutable/entry/app.J4c7Y-s1.js",imports:["_app/immutable/entry/start.DwqH21hD.js","_app/immutable/chunks/I0HqJ4bw.js","_app/immutable/chunks/CSebMEVx.js","_app/immutable/chunks/-8l5pipx.js","_app/immutable/entry/app.J4c7Y-s1.js","_app/immutable/chunks/CSebMEVx.js","_app/immutable/chunks/C0Zw5lrC.js","_app/immutable/chunks/CaP2nc5g.js","_app/immutable/chunks/-8l5pipx.js","_app/immutable/chunks/D_Ne6IhT.js","_app/immutable/chunks/z9UBqzjZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-20rJX_uW.js')),
			__memo(() => import('./chunks/1-D0gdAGmf.js')),
			__memo(() => import('./chunks/2-v8PybLyg.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
