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
  styles: {
    "spectre.css": [
      "dist/spectre.css",
      "dist/spectre-icons.css",
      "dist/spectre-exp.css"
    ]
  }
  // globals: { spectre: "spectre.css" }
}

exports.plugins = {
  babel: { presets: ["latest", "stage-0"] },
  sass: {}
}

exports.paths = {
  public: "docs"
}
