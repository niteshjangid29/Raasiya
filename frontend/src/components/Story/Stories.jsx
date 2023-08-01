import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getStories } from "../../actions/storyActions";
import Loader from "../layout/Loader/Loader";
import BlogCard from "./BlogCard";

const Stories = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, stories, storiesCount } = useSelector(
    (state) => state.stories
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getStories());
  }, [error, alert, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="products-box">
            <h2 className="heading productHeading">{storiesCount} Stories</h2>
            <div>
              <div className="products-box-1">
                <div className="products">
                  {stories &&
                    stories.map((story) => (
                      <BlogCard key={story._id} story={story} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Stories;
