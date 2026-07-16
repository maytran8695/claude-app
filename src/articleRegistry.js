const modules = import.meta.glob("./articles/**/*.jsx");

function prettyTitle(filename) {
  return filename
    .replace(".jsx", "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

const articles = Object.entries(modules).map(([path, loader]) => {

    const parts = path.split("/");

    const category = parts[parts.length - 2];

    const filename = parts[parts.length - 1];

    return {

        title: prettyTitle(filename),

        slug: filename.replace(".jsx",""),

        category,

        loader

    };

});

export default articles;