import React, { useState, useEffect } from 'react';
import { SignUpButton } from '../../../common/Button';
import { OriginInput } from '../../../common/Input';
import { BiSearchAlt } from 'react-icons/bi';
import { Wrapper } from '../../../styles/Utils';
import { CreateNewQuiz, CreateQuizHeader, QuizName, QuizOptions } from '../CreateExam/CreateExamStyles';
import { ClassBody, ClassFooter, ClassHeader, ClassItem, ClassList, Container } from './SearchStyles';
import { classDetail } from '../Profile/dummyData';

const Search = () => {
  const [searchContent, setSearchContent] = useState('');
  const [originClassList, setOriginClassList] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);

  useEffect(() => {
    if (searchContent === '') {
      setClassList(originClassList);
    } else {
      setClassList(() =>
        originClassList.filter((item) => {
          const className = item.name.toLowerCase();
          const author = item.author.toLowerCase();
          const content = searchContent.toLowerCase();
          return className.includes(content) || author.includes(content);
        }),
      );
    }
  }, [searchContent]);

  useEffect(() => {
    setOriginClassList(classDetail);
    setClassList(classDetail);
  }, []);

  return (
    <Container>
      <Wrapper>
        <CreateQuizHeader>
          <QuizName>
            <OriginInput
              value={searchContent}
              name="search-class"
              type="search"
              placeholder="Enter your class..."
              setValue={(value) => setSearchContent(value)}
            />
          </QuizName>
          <CreateNewQuiz>
            <SignUpButton>
              <BiSearchAlt />
              <span>Search</span>
            </SignUpButton>
          </CreateNewQuiz>
        </CreateQuizHeader>
        <QuizOptions>
          <ClassList>
            {classList.map((item) => (
              <ClassItem key={item.id}>
                <ClassHeader color={item.color} />
                <ClassBody>
                  <h3>{item.name}</h3>
                  <span>{item.author}</span>
                  <p>{item.note}</p>
                </ClassBody>
                <ClassFooter>
                  <SignUpButton>Join now</SignUpButton>
                </ClassFooter>
              </ClassItem>
            ))}
          </ClassList>
        </QuizOptions>
      </Wrapper>
    </Container>
  );
};

export default Search;
