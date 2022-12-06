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
import { getAllClass, joinClass } from '../../../api/class';
import { getOriginTextInHtmlString } from '../../../utils';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/user/userSlice';
import { LoadingFullPage } from '../../Loading';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState('');
  const [originClassList, setOriginClassList] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [className, setClassName] = useState('');
  const [classId, setClassId] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleOpenDialog = (name: string, id: string) => {
    setClassName(name);
    setClassId(id);
    setIsShowDialog(true);
  };

  const handleJoinClass = async () => {
    setIsLoading(true);
    const res = await joinClass(classId);

    if (res.isSuccess) {
      setIsShowDialog(false);
      setIsLoading(false);
      navigate(`/class/${classId}`);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    const getAllClassToSearch = async () => {
      const res = await getAllClass();
      if (res.isSuccess && isSubscribed) {
        setClassList(res.data);
        setOriginClassList(res.data);
        setIsLoading(false);
      }
    };

    getAllClassToSearch();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Container>
      {isShowDialog && (
        <ConfirmDialog
          content={`Are you sure you want to join '${className}' class?`}
          title="Confirm to join"
          applyButtonContent="Okay"
          handleCancelDialog={() => setIsShowDialog(false)}
          handleApplyDialog={handleJoinClass}
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
        {isLoading ? (
          <LoadingFullPage />
        ) : (
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
                      <span>{item.authorName}</span>
                      <p>{getOriginTextInHtmlString(item.note)}</p>
                    </ClassBody>
                    <ClassFooter>
                      <SignUpButton
                        onClick={() =>
                          item.studentIds.includes(user.id)
                            ? navigate(`/class/${item.id}`)
                            : handleOpenDialog(item.name, item.id)
                        }
                      >
                        {item.studentIds.includes(user.id) ? 'Detail' : 'Join now'}
                      </SignUpButton>
                    </ClassFooter>
                  </div>
                </ClassItem>
              ))}
            </ClassList>
          </QuizOptions>
        )}
      </Wrapper>
    </Container>
  );
};

export default Search;
