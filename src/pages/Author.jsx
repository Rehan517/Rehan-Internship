import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState([null])
  const {id} = useParams()
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  
  

  async function fetchAuthor(){
    setLoading(false)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
  setAuthor(data)
  setLoading(true)
  
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthor();
    
  },[]);
  
  // console.log(author)
  
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                    { loading ?
                      (<img src={author.authorImage} alt="" />) :(
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )
                    }

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                      { loading ? (
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>) :(
                          <h4>
                            <Skeleton width="200px" />
                            <span className="profile_username">
                              <Skeleton width="100px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="250px" />
                            </span>
                          </h4>
                        )
                      }
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                    {loading ? (
                      <div>
                      <div className="profile_follower">{author.followers + (isFollowing? 1: 0)} followers</div>
                      {
                        isFollowing?
                        (<Link to="#" className="btn-main" onClick={() =>setIsFollowing(!isFollowing)}>
                        Unfollow
                      </Link>) :
                      (<Link to="#" className="btn-main" onClick={() =>setIsFollowing(!isFollowing)}>
                        Follow
                      </Link>)
                      } 
                      </div> ) :(
                        <div className="profile_follower">
                          <Skeleton width="150px" height="40px" />
                        </div>
                      )
                    }
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems collection = { author.nftCollection? author.nftCollection: []} authorImage = {author.authorImage}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
