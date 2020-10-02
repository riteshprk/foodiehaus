const apiKey =
  "YV5OhCTMB8WFO9qHd3ds1Z8aTux1Wf7IFSuuSb4Jy0wPLWJOyqqxobTI3BFsUjvumQC1ch1DLW1Le6UDvnsfc1kgI6JoS7qGLkkxbFoJuOqnrzkFcb9aI-Pfb_B0X3Yx";
const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        }
      });
  },
};
export default Yelp;
