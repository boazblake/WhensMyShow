// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      "vendor.js": /^(?!app)/, // Files that are not in `app` dir.
      "app.js": /^app/
    }
  },

  stylesheets: {
    joinTo: {
      // "css/app.css": /^styles/,
      "css/app.css": /^(?!css)/
    }
  }
}

exports.npm = {
  globals: {
    m: "mithril"
  },
  styles: {
    "spectre.css": [
      "dist/spectre.css",
      "dist/spectre-icons.css",
      "dist/spectre-exp.css"
    ]
  }
}

exports.plugins = {
  babel: { presets: ["latest", "stage-0"] },
  uncss: { options: { csspath: "css/app.css" } }
  // swPrecache: {
  //   autorequire: ["app/assets/index.html"],
  //   options: {
  //     staticFileGlobs: ["docs/**/!(*map*)"],
  //     stripPrefix: "docs/"
  //   }
  // }
}

exports.paths = {
  public: "docs"
}
