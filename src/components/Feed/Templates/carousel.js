import React, { Component } from 'react'  
import Carousel from 'react-bootstrap/Carousel'  
import "./carousel.css"



  /**
   * this is a bootstrap carousel item
   * image links for carousel items may be changed from here
   */

function BootstrapCarousel(props){  
               return (  

                        <div>  

                         <div className='container-fluid' >  

                         <Carousel>  

                         <Carousel.Item style={{'height':"400px"}} >  

                         <img style={{'height':"400px"}}  

                         className="d-block w-100"  

                        src={'https://cdn3.iconfinder.com/data/icons/google-suits-1/32/30_adsense_money_earn_advertise_ads_google-512.png'}  />  

                           <Carousel.Caption>  
                           <h1 className="ad">Sunny Social is looking for advertisements</h1>
                                 </Carousel.Caption>  

                                 </Carousel.Item  >  

                                 <Carousel.Item style={{'height':"400px"}}>  

                                 <img style={{'height':"400px"}}  

                                   className="d-block w-100"  

                                    src={"https://lh3.googleusercontent.com/proxy/3W3yfWR_zguwbUx8e912_njdstOH3MPzPKpadJUcucr7b-R-WLRQ5d-GqWIlGvnaggL_e_eFA54OJ8VN9NxcySu-qXjNzCWoUqosovYSXk9NO5OyBCs0baLCDfEdoyyiKEHgmgb_pYqgdjPzsA"}    />  

                                       <Carousel.Caption>  
                                   <h3 className="conn">Stay connected with Sunny Social</h3>  

                                      </Carousel.Caption>  

                                         </Carousel.Item>  

                                       <Carousel.Item style={{'height':"400px"}}>  

                                       <img style={{'height':"400px"}}  

                                        className="d-block w-100"  

                                         src={"https://www.fg-a.com/wallpapers/2021-black-random-stones.jpg"}   />  

                                        <Carousel.Caption>  
                                          <h3> #BlackLivesMatter</h3>
                                          <p>Sunny Social stands for justice, freedom and racial equality</p>  

                                          </Carousel.Caption>  

                                         </Carousel.Item>  

                                        </Carousel>  

                                </div>  

                        </div>  

                )  

        }  


export default BootstrapCarousel  
