import m from "mithril"
import { imagesUrl } from "../../Models.js"

const Results = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".results.columns",
        mdl.data && mdl.data.results
          ? mdl.data.results.map((result) => {
              return m(".column col-9", [
                m(".tile", [
                  m(
                    ".tile-icon",
                    m(
                      ".example-tile-icon",
                      m("img", { src: `${imagesUrl(result.poster_path)}` })
                    )
                  ),
                  m(".tile-content", [
                    m("p.tile-title", result.original_name),
                    m("p.tile-subtitle", result.overview)
                  ]),
                  m(".tile-action", m("button.btn btn-primary", "Details"))
                ])
              ])
            })
          : []
      )
  }
}

export default Results
