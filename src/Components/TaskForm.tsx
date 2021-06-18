import React, { FC } from 'react';
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { FormikHelpers, useFormik } from 'formik';
import validationSchema from './Validation/schema';
import { ITask, PropsTaskForm } from '../interfaces/task';

const TaskForm: FC<PropsTaskForm> = ({ onTaskAdded }: PropsTaskForm) => {
  const { handleSubmit, errors, handleChange, values, handleBlur } = useFormik<
    Pick<ITask, 'title'>
  >({
    initialValues: {
      title: '',
    },
    onSubmit: (title: ITask, { resetForm }: FormikHelpers<ITask>) => {
      onTaskAdded(title);
      resetForm();
    },
    validationSchema,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <InputLabel sx={{ mb: 1, mt: 3 }} htmlFor="titleTask">
          Título
        </InputLabel>
        <TextField
          data-testid="task-title-input"
          id="title"
          name="title"
          type="text"
          fullWidth
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Box data-testid="title-msg-error" sx={{ color: 'red', mt: 1 }}>
          {errors.title && <Typography>{errors.title}</Typography>}
        </Box>
        <Button
          data-testid="add-task-button"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            mt: 1,
          }}
          type="submit"
        >
          Adicionar tarefa
        </Button>
      </form>
    </Box>
  );
};

export default TaskForm;
