const modules = import.meta.glob("../articles/**/*.jsx", {
    eager: true,
  });
  
  function formatTitle(filename) {
    return filename
      .replace(".jsx", "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  }
  
  const articles = Object.entries(modules).map(([path, module]) => {
  
    const parts = path.split("/");
  
    const category = parts[parts.length - 2];
  
    const filename = parts[parts.length - 1];
  
    return {
  
      category,
  
      title: formatTitle(filename),
  
      slug: filename.replace(".jsx", ""),
  
      Component: module.default,
  
    };
  
  });
  
  export default articles;