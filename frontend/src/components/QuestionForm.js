import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { getData, updateData, addData } from '../services/questionService';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import './QuestionForm.css';

const QuestionForm = ({ questionId }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    id: '',
    title: '',
    description: '',
    category: [],
    complexity: '',
  });
  const [mode, setMode] = useState('edit');

  useEffect(() => {
    if (questionId) {
      const fetchQuestion = async () => {
        try {
          const existingQuestion = await getData(`/${questionId}`);
          if (existingQuestion) {
            setQuestion({
              title: existingQuestion.title,
              description: existingQuestion.desc,
              category: existingQuestion.c,
              complexity: existingQuestion.d,
            });
          }
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      };
      fetchQuestion();
    }
  }, [questionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setQuestion({
        ...question,
        category: value.split(", "),
      });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      title: question.title,
      desc: question.description,
      c: question.category,
      d: question.complexity,
    };

    try {
      if (questionId) {
        await updateData(`/${questionId}`, questionData);
      } else {
        await addData("/", questionData);
      }
      navigate("/questions");
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">{questionId ? 'Edit Question' : 'Add New Question'}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Question Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={question.title}
            onChange={handleChange}
            required
            placeholder="Enter the title of the question"
          />
        </Form.Group>
        <Form.Group controlId="formCategory" className="mt-3">
          <Form.Label>Question Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={question.category}
            onChange={handleChange}
            required
            placeholder="Enter the category of the question"
          />
        </Form.Group>
        <Form.Group controlId="formComplexity" className="mt-3">
          <Form.Label>Question Complexity</Form.Label>
          <Form.Control
            as="select"
            name="complexity"
            value={question.complexity}
            onChange={handleChange}
            required
          >
            <option value="">Select Complexity</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Question Description</Form.Label>
          {/* <div className="join block mt-2">
            <input
              className={`join-item btn ${mode === 'edit' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
              type="radio"
              name="options"
              aria-label="Edit"
              onClick={() => setMode('edit')}
            />
            <input
              className={`join-item btn ${mode === 'preview' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
              type="radio"
              name="options"
              aria-label="Preview"
              onClick={() => setMode('preview')}
            />
          </div> */}

          <div role="tablist" className="tabs tabs-boxed">
            <a
              role="tab"
              className={`tab ${mode === 'edit' ? 'tab-active' : ''}`}
              onClick={() => setMode('edit')}
            >
              Edit
            </a>
            <a
              role="tab"
              className={`tab ${mode === 'preview' ? 'tab-active' : ''}`}
              onClick={() => setMode('preview')}
            >
              Preview
            </a>
          </div>
         

            {mode === 'edit' && (
              <TextareaAutosize
                className="mt-4 p-2 border rounded w-full"
                minRows={5}
                name="description"
                value={question.description}
                onChange={handleChange}
                placeholder="Describe the question in detail here in markdown syntax"
              />
            )}

            {mode === 'preview' && (
              <div className="mt-4 p-2 border rounded">
                <ReactMarkdown>{question.description}</ReactMarkdown>
              </div>
            )}
          

          {/* <SegmentedControl selected={mode} onSelect={setMode} />
          {mode === 'Edit' ? (
            <TextareaAutosize
              minRows={5}
              name="description"
              value={question.description}
              onChange={handleChange}
              required
              placeholder="Describe the question in detail"
              style={{ width: '100%', padding: '12px', marginTop: '16px' }}
            />
          ) : (
            <div className="preview-box mt-2 p-2 border">
              <ReactMarkdown>{question.description}</ReactMarkdown>
            </div>
          )} */}
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {questionId ? 'Update Question' : 'Add Question'}
        </Button>
      </Form>
    </Container>
  );
};

export default QuestionForm;