let ID = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  console.log(ID());
  const parentAcordion = document.getElementById("accordion");
  
  magazines.forEach((ele, index) => {
    let url = `https://api.rss2json.com/v1/api.json?rss_url=${ele}`;
    init(url, index);
  });
  
  async function init(url, index) {
    try {
      const apiResponse = await fetch(url);
      const data = await apiResponse.json();
      console.log(data);
      accordionMain(data["feed"]["title"], data["items"], index);
    } catch (error) {
      return null;
    }
  }
  
  function accordionMain(title, items, index) {
    let accordionId = ID();
    const titleData = displayTitle(title, accordionId, index);
    const bodyData = accessItemsData(items, accordionId);
    const acordionItem = `
       <div class="accordion-item">
              ${titleData}
              <div id="collapse${accordionId}" class="accordion-collapse collapse ${
      index === 0 ? "show" : ""
    }" 
                    aria-labelledby="heading${accordionId}" data-bs-parent="#accordion">
                  <div class="accordion-body"> 
                   <div class="carouselBody">
                      <div id="carousel${accordionId}" class="carousel 
                                slide" data-bs-ride="carousel">
                          <div class="carousel-inner">
                             ${bodyData}
                          </div>
                          <button class="carousel-control-prev" type="button" data-bs-target="#carousel${accordionId}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button class="carousel-control-next" type="button" data-bs-target="#carousel${accordionId}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                      </div>
                   </div>
                  </div>
              </div>
        </div>`;
    //   console.log(acordionItem);
    parentAcordion.innerHTML += acordionItem;
  }
  
  function displayTitle(title, uniqueID, index) {
    const accordianTitle = `
         <h2 class="accordion-header" id="heading${uniqueID}">
          <button class="accordion-button ${
            index === 0 ? " " : "collapsed"
          }" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${uniqueID}" aria-expanded= ${
      index === 0 ? "true" : "false"
    } aria-controls="collapse${uniqueID}">
           ${title}
          </button>
          </h2>
     `;
    return accordianTitle;
  }
  
  function accessItemsData(values) {
    const tpl = document.createElement("template");
    for (let i = 0; i < values.length; i++) {
      tpl.innerHTML += carouselBody(
        values[i].link,
        values[i].enclosure.link,
        values[i].title,
        values[i].description,
        i
      );
    }
    return tpl.innerHTML;
  }
  
  function carouselBody(link, images, heading, description, index) {
    const creatCarouselElement = `
                    <div class="carousel-item ${index === 0 ? "active" : ""}">
                          <a href=${link} target = "_blank" class="cardLink">
                            <img src=${images} class="d-block w-100 img-fluid" alt="cardImages">
                            <div class="cardBody">
                                <h3 class="cardHeading">
                                    ${heading}
                                </h3>
                                <p class="cardParagraph">
                                    ${description}
                                </p>
                            </div>
                          </a>
                        </div>
                  `;
    //   console.log(creatCarouselElement);
    return creatCarouselElement;
  }