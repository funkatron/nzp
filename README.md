# NZP prototype 2023-02-26

## Requirements

- any web server. I used [live-server](https://www.npmjs.com/package/live-server) for development.  Example usage:

```bash
cd /path/to/this/project
live-server ./ --entry-file=index.html
```

This should open a browser window with the project running.

# Design considerations

- Time allocated was 4 hours, so this will be more of a prototype than a finished product.
- To keep thinks simple, I used a single HTML file with no build process.  This is not ideal for a some projects, but it's a good way to get something up and running quickly.
- Use technologies I know pretty well -- Vue.js and Bootstrap/BootstrapVue
- I think building out the Models is key here, and I purposefully did this vs just making POJsOs. This will make future work that involves manipulating and aggregating data easier.
- Everybody always wants CSV export, so I added that. JSON is also supported.

---
_Ed Finkler <coj@funkatron.com>_    
_2023-02-27_
