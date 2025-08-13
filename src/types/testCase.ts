export interface TestCase {
  id: string;
  summary: string;
  given: string;
  when: string;
  then: string;
  testCaseType?: string;
  status?: 'draft' | 'approved' | 'deprecated';
  lastUpdated?: string;
}

export const DEFAULT_TEST_CASE: TestCase = {
  id: '',
  summary: '',
  given: '',
  when: '',
  then: '',
  testCaseType: 'Functional',
  status: 'draft',
  lastUpdated: new Date().toISOString()
};
