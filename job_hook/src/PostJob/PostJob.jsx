import { isNotEmpty, useForm } from '@mantine/form';
import { fields } from '../Data/PostJob';
import { useNavigate } from 'react-router-dom';
import SelectInput from './SelectInput';
import { TagsInput, Button, Textarea, NumberInput } from '@mantine/core';
import TextEditor from './TextEditor';
import { postJob } from '../Services/PostJobSerivce';
import { content } from '../Data/PostJob';
import { notifications } from '@mantine/notifications';
import { useSelector } from 'react-redux';
const PostJob = () => {
  const profile=useSelector((state) => state.profile);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      jobTitle: '',
      company: '',
      experience: '',
      jobType: '',
      location: '',
      packageOffered: 0,
      skillsRequired: [],
      about: '',
      description: content,
      jobStatus: null,
      postBy: null,
    },
    validate: {
      location: isNotEmpty('Location is required'),
      jobTitle: isNotEmpty('Job Title is required'),
      company: isNotEmpty('Company is required'),
      experience: isNotEmpty('Experience is required'),
      jobType: isNotEmpty('Job Type is required'),
      packageOffered: (value) => (value > 0 ? null : 'Salary must be greater than 0'),
      about: isNotEmpty('About Company is required'),
      skillsRequired: isNotEmpty('Skills are required'),
      description: isNotEmpty('Job Description is required'),
    },
  });

  const handleSubmit = async (values) => {
    if (!form.validate().hasErrors) {
      try {
        const response = await postJob({...values, postBy: profile.id, jobStatus: 'ACTIVE' });
        console.log("Submitting job:", { ...values, postBy: profile.id, jobStatus: 'ACTIVE' });

        notifications.show({
          title: 'Job Posted',
          message: 'Your job has been posted successfully!',
          color: 'green',
        });
        navigate(`/posted-job/${response.id}`);
      
      } catch (error) {
        notifications.show({
          title: 'Error Posting Job',
          message: 'There was an error posting your job. Please try again later.',
          color: 'red',
        });
        console.error('Error posting job:', error);
      }
    }
  };
  const handleDraft = async (values) => {
    if (!form.validate().hasErrors) {
      try {
        const response = await postJob({...values, userId: profile.id, jobStatus: 'DRAFT' });
        notifications.show({
          title: 'Job Posted',
          message: 'Your job has been in draft!',
          color: 'green',
        });
        navigate(`/posted-job/${response.id}`);
      
      } catch (error) {
        notifications.show({
          title: 'Error Posting Job',
          message: 'There was an error posting your job. Please try again later.',
          color: 'red',
        });
        console.error('Error posting job:', error);
      }
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="text-3xl font-semibold mb-5 mt-6">
        Post a <span className="text-bright-sun-400">Job</span>
      </div>

      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput
          {...fields[0]}
          value={form.values.jobTitle}
          onChange={(val) => form.setFieldValue('jobTitle', val)}
          error={form.errors.jobTitle}

        />
        <SelectInput
          {...fields[1]}
          value={form.values.company}
          onChange={(val) => form.setFieldValue('company', val)}
          error={form.errors.company}
        />
      </div>

      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput
          {...fields[2]}
          value={form.values.experience}
          onChange={(val) => form.setFieldValue('experience', val)}
          error={form.errors.experience}
        />
        <SelectInput
          {...fields[3]}
          value={form.values.jobType}
          onChange={(val) => form.setFieldValue('jobType', val)}
          error={form.errors.jobType}
        />
      </div>

      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput
          {...fields[4]}
          value={form.values.location}
          onChange={(val) => form.setFieldValue('location', val)}
         {...form.getInputProps('location')}
        />

        <NumberInput
          withAsterisk
          label="Salary (LPA)"
          placeholder="Enter Salary"
          min={0}
          max={100}
          clampBehavior="strict"
          {...form.getInputProps('packageOffered')}
        />
      </div>

      <Textarea
        withAsterisk
        label="About Company"
        placeholder="Enter About Company..."
        minRows={3}
        {...form.getInputProps('about')}
      />

      <TagsInput
        withAsterisk
        label="Skills"
        placeholder="Enter Skills..."
        splitChars={[', ', ' ', '|']}
        clearable
        acceptValueOnBlur
        {...form.getInputProps('skillsRequired')}
      />

      <div className="text-2xl font-semibold mb-5 mt-3">
        Job Description <span className="text-red-700">*</span>
      </div>

      <TextEditor
        value={form.values.description}
        onChange={(val) => form.setFieldValue('description', val)}
        error={form.errors.description}
      />

      <div className="flex gap-5 mt-5">
        <Button
          variant="light"
          color="brightSun.4"
          onClick={form.onSubmit(handleSubmit)}
        >
          Post Job
        </Button>
        <Button variant="outline" color="brightSun.4" onClick={form.onSubmit(handleDraft)}>
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
