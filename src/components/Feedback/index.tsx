import React from 'react';
import Slider from '../../common/Slider';
import { Wrapper } from '../../styles/Utils';
import {
  Container,
  Avatar,
  Content,
  FeedbackItem,
  FeedbackList,
} from './FeedbackStyles';

const Feedback = () => {
  return (
    <Container>
      <Wrapper>
        <FeedbackList>
          <Slider slidesPerPage={2}>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  accusamus voluptates dolor ea commodi, magnam quasi,
                  perferendis tenetur hic optio in architecto unde laudantium,
                  eius molestias laboriosam error saepe animi?
                </p>
                <h4>Felix Nguyen 6</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  accusamus voluptates dolor ea commodi, magnam quasi,
                  perferendis tenetur hic optio in architecto unde laudantium,
                  eius molestias laboriosam error saepe animi?
                </p>
                <h4>Felix Nguyen 5</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  accusamus voluptates dolor ea commodi, magnam quasi,
                  perferendis tenetur hic optio in architecto unde laudantium,
                  eius molestias laboriosam error saepe animi?
                </p>
                <h4>Felix Nguyen 4</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  accusamus voluptates dolor ea commodi, magnam quasi,
                  perferendis tenetur hic optio in architecto unde laudantium,
                  eius molestias laboriosam error saepe animi?
                </p>
                <h4>Felix Nguyen 3</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  accusamus voluptates dolor ea commodi, magnam quasi,
                  perferendis tenetur hic optio in architecto unde laudantium,
                  eius molestias laboriosam error saepe animi?
                </p>
                <h4>Felix Nguyen 2</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  accusamus voluptates dolor ea commodi, magnam quasi,
                  perferendis tenetur hic optio in architecto unde laudantium,
                  eius molestias laboriosam error saepe animi?
                </p>
                <h4>Felix Nguyen 1</h4>
              </Content>
            </FeedbackItem>
          </Slider>
        </FeedbackList>
      </Wrapper>
    </Container>
  );
};

export default Feedback;
