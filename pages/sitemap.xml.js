import {APICallUrl} from "../Components/Constant";


function generateSiteMap(data, domain) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const processedChildIds = new Set();

    const generateUrlXML = (slug, lastmod, childId, type) => {
        // Modify the childId based on the type
        const modifiedChildId = `${type}_${childId}`;

        if (processedChildIds.has(modifiedChildId)) {
            return '';  // Return empty string if this modified child ID is already processed
        }

        // Add the modified child ID to the Set
        processedChildIds.add(modifiedChildId);

        const fullUrl = `${domain}/${slug}`;

        return `
       <url>
           <loc>${fullUrl}</loc>
           <lastmod>${formatDate(lastmod)}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>
    `;
    };



    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
            ${data?.pages?.map((el) => {
        return `
       <url>
           <loc>${`${domain}/${el?.slugable?.key}`}</loc>
           <lastmod>${formatDate(el?.created_at)}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>
     `;
    })
        .join('')}
   ${data?.posts?.data?.map((el) => {
        return generateUrlXML(el?.slug, el?.created_at, el?.id) +
            el?.categories.map(child => generateUrlXML(child?.slug, child?.created_at, child?.id, "cat")).join('') +
            el?.tags.map(child => generateUrlXML(`tags/${child?.slug}`, child?.created_at, child?.id, "tag")).join('');
    }).join('')}
         ${data?.categories?.data?.map((el) => {
        return `
       <url>
           <loc>${`${domain}/${el?.slugable?.prefix}/${el?.slugable?.key}`}</loc>
           <lastmod>${formatDate(el?.created_at)}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>
       ${el?.active_children.map((child) => {
            return `
       <url>
           <loc>${`${domain}/${el?.slugable?.prefix}/${el?.slugable?.key}/${child?.slugable?.key}`}</loc>
           <lastmod>${formatDate(child?.created_at)}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>
    ${child?.active_children?.map((child2) => {
                return `
       <url>
           <loc>${`${domain}/${el?.slugable?.prefix}/${el?.slugable?.key}/${child?.slugable?.key}/${child2?.slugable?.key}`}</loc>
           <lastmod>${formatDate(child2?.created_at)}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>`

            })}
`

        })}
       
     `;
    })
        .join('')}
    ${data?.brands?.map((el) => {
        return `
       <url>
           <loc>${`${domain}/${el?.slugable?.prefix}/${el?.slugable?.key}`}</loc>
           <lastmod>${formatDate(el?.created_at)}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>
     `;
    })
        .join('')}
        
         ${data?.search?.data?.map((el,i) => {
        
        return `
       <url>
           <loc>${`${domain}/${el?.prefix}/${el?.key}`}</loc>
           <lastmod>${formatDate(el?.created_at)}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>
     `;
    })
        .join('')}
   </urlset>
 `;
}

function SitemapXml() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({req, res}) {
    const postRes = await fetch(`${APICallUrl}/api/v1/posts`);
    const pagesResponse = await fetch(`${APICallUrl}/api/pages`);
    const categories = await fetch(`${APICallUrl}/api/categories`);
    const brands = await fetch(`${APICallUrl}/api/brands`);
    const responseSearch = await fetch(`${APICallUrl}/api/sitemap-products`);


    const domain = `https://${req.headers.host}`;
    const data = {
        posts: await postRes.json(),
        pages: await pagesResponse?.json(),
        categories: await categories?.json(),
        brands: await brands?.json(),
        search: await responseSearch?.json(),
    };


    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(data, domain);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SitemapXml;