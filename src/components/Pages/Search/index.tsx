import React, { useState, useEffect } from 'react';
import { SignUpButton } from '../../../common/Button';
import { OriginInput } from '../../../common/Input';
import { BiSearchAlt } from 'react-icons/bi';
import { Wrapper } from '../../../styles/Utils';
import { CreateNewQuiz, CreateQuizHeader, QuizName, QuizOptions } from '../CreateExam/CreateExamStyles';
import { ClassBody, ClassFooter, ClassHeader, ClassItem, ClassList, Container } from './SearchStyles';
import { classDetail } from '../Profile/dummyData';
import { SiGoogleclassroom } from 'react-icons/si';
import { ConfirmDialog } from '../../../common/Dialog';

const Search = () => {
  const [searchContent, setSearchContent] = useState('');
  const [originClassList, setOriginClassList] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [className, setClassName] = useState('');

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

  const handleOpenDialog = (name: string) => {
    setClassName(name);
    setIsShowDialog(true);
  };

  useEffect(() => {
    setOriginClassList(classDetail);
    setClassList(classDetail);
  }, []);

  return (
    <Container>
      {isShowDialog && (
        <ConfirmDialog
          content={`Are you sure you want to join '${className}' class?`}
          title="Confirm to join"
          applyButtonContent="Okay"
          handleCancelDialog={() => setIsShowDialog(false)}
          handleApplyDialog={() => {}}
          handleCloseDialog={() => setIsShowDialog(false)}
        />
      )}

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
                <div>
                  <ClassHeader color={item.color}>
                    <SiGoogleclassroom />
                  </ClassHeader>
                  <ClassBody>
                    <h3>{item.name}</h3>
                    <span>{item.author}</span>
                    <p>{item.note}</p>
                  </ClassBody>
                  <ClassFooter>
                    <SignUpButton onClick={() => handleOpenDialog(item.name)}>Join now</SignUpButton>
                  </ClassFooter>
                </div>
              </ClassItem>
            ))}
          </ClassList>
        </QuizOptions>
      </Wrapper>
    </Container>
  );
};

export default Search;
