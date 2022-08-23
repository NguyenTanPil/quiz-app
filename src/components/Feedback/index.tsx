import React from 'react';
import Slider from '../../common/Slider';
import { devices } from '../../styles/breakpoints';
import { Wrapper } from '../../styles/Utils';
import { Avatar, Container, Content, FeedbackItem, FeedbackList } from './FeedbackStyles';

const Feedback = () => {
  return (
    <Container>
      <Wrapper>
        <FeedbackList>
          <Slider
            breakpoints={[
              {
                minWidth: devices.default,
                items: 1,
              },
              {
                minWidth: devices.largeDevices,
                items: 2,
              },
            ]}
            options={{
              arrow: false,
              dots: true,
            }}
          >
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  1 I realize it wasn’t easy to admit you were running behind on this project, but I’m so glad you were
                  honest. We can fix this together. If you had kept quiet and failed to meet our deadline, we might be
                  in hot water with the big boss.
                </p>
                <h4>Olia Nayda</h4>
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
                  I know things are stressful right now, but thanks to you, I think everything’s going to slow down
                  soon. When it does, I’m taking you out to happy hour to thank you for everything you’ve done to get us
                  out of this situation.
                </p>
                <h4>Ed Hackney</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  2 I saw that you learned how to use pivot tables for your Excel project and it really helped display
                  the data. Even though that wasn’t in your job description, it shows that you are a great learner and
                  hungry to do the best job possible.
                </p>
                <h4>Joseph Gonzalez</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1629467057571-42d22d8f0cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=796&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  I noticed last week that you restructured our shared Google Sheet with conditional formatting that
                  made it easier for me to understand and read the data. I appreciate you taking the initiative to learn
                  how to do that.
                </p>
                <h4>May Gauthier</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  3 I’m so thrilled that you managed to secure ten new partners. This achievement surpassed my
                  expectations, and it will make a significant impact on the kind of business we can do in the next
                  quarter.
                </p>
                <h4>Leio McLaren</h4>
              </Content>
            </FeedbackItem>
            <FeedbackItem>
              <Avatar>
                <img
                  src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1512&q=80"
                  alt=""
                />
              </Avatar>
              <Content>
                <p>
                  I know this goal wasn’t easy. How you managed to set it and systematically work towards it until you
                  achieved it truly speaks to your intelligence, tenacity, and perseverance. I’m lucky to have you on my
                  team.
                </p>
                <h4>Taras Shypka</h4>
              </Content>
            </FeedbackItem>
          </Slider>
        </FeedbackList>
      </Wrapper>
    </Container>
  );
};

export default Feedback;
