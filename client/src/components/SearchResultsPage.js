import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import img1 from "../imgs/profile-img.jpg"
import { NavLink } from "react-router-dom";
import "../css/searchpage.css"

function SearchResultsPage() {
  const location = useLocation();
  const searchQuery = location.state.searchQuery;
  const filteredData = location.state.searchResults;
  const navigate = useNavigate();

  const viewProfile = (userId) => {
    navigate(`/users/user/${userId}`);
    // Fetch individual details for the clicked item
    // and display them in a separate page forusers profile section.
  };
  

  return (
<div class="content">
  <div class="container">
    <div class="row">
      <h3>Search Results for "{searchQuery}"</h3>
      <p>Number of search results: {filteredData.length}</p>
    </div>
    <div class="row">
      {filteredData.sort((a, b)=> a.name.localeCompare(b.name)).map((user) => (
        <div class="col-lg-4">
          <div class="text-center card-box">
            <div class="member-card pt-2 pb-2">
              <div class="thumb-lg member-thumb mx-auto">
             
                <img src={user.name === "Jatin Bisht" ? img1 : user.image} class="rounded-circle img-thumbnail" alt="profile-image" />
                </div>
                <br />
              <div class="">
              
                <h4>{user.name}</h4>
                <p class="text-muted">@{user.work} <span>| </span><span>{user.organisation}</span></p>
              </div>
              <ul class="social-links list-inline">
                <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook"></i></a></li>
                <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-linkedin"></i></a></li>
              </ul>
              <button key={user.id} type="button" class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light button"onClick={() => viewProfile(user._id)}>View Profile</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default SearchResultsPage;
