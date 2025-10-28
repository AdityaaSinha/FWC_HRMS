export const mockFetchAIGeneration = async (type, payload) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (type === 'generateJD') resolve({ success: true, data: `Generated JD for ${payload.jobTitle}` });
      if (type === 'screenResume') resolve({ success: true, data: { score: 82, summary: 'Good match', missing_keywords: ['React', 'Node'] } });
      if (type === 'summarizeFeedback') resolve({ success: true, data: { strengths: ['Teamwork'], growth_areas: ['Time Management'] } });
    }, 1200);
  });
};
