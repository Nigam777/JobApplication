// services/PostJobService.js
export const postJob = async (jobData) => {
  try {
    const response = await fetch('http://localhost:8080/jobs/postJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error('Failed to post job');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting job:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await fetch('http://localhost:8080/jobs/allJobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}
export const getJobById = async (jobId) => {
  try {
    const response = await fetch(`http://localhost:8080/jobs/findJob/${jobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

 export const applyJob = async (id,applicationData) => {
  try {
    const response = await fetch(`http://localhost:8080/jobs/applyJob/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error('Failed to apply for job');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
}

export const getJobPosteBy= async (id)=>{
  try {
    const response = await fetch(`http://localhost:8080/jobs/postBy/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs posted by user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs posted by user:', error);
    throw error;
  }
}


export const changeApplicantStatus = async (application) => {
  try {
    const response = await fetch('http://localhost:8080/jobs/changeAppStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    });

    if (!response.ok) {
      throw new Error('Failed to change applicant status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error changing applicant status:', error);
    throw error;
  }
};
