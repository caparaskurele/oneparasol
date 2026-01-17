export interface ProjectCell {
  id: string;
  type: 'markdown' | 'python';
  content: string;
  explanation?: string; // Additional explanation for solved projects
}

export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  datasetName: string;
  datasetUrl: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  solvedCells: ProjectCell[];
  practiceDescription?: string;
}

export const projects: Project[] = [
  {
    id: 'purchase-data-analysis',
    name: 'Purchase Data Analysis',
    title: 'E-commerce Purchase Data Analysis',
    description: 'Analyze customer purchase patterns using statistical analysis and hypothesis testing',
    datasetName: 'Purchase Dataset',
    datasetUrl: '/img/files/Python/purchase-dataset.csv',
    category: 'Data Analysis',
    difficulty: 'Intermediate',
    practiceDescription: 'Practice hypothesis testing and statistical analysis on the purchase dataset. Try different hypotheses and explore the data on your own.',
    solvedCells: [
      {
        id: 'intro',
        type: 'markdown',
        content: '# Good Morning Everyone! Purchase Data Analysis\n\nWe will analyze e-commerce purchase data to understand customer behavior and validate hypotheses using statistical testing.',
      },
      {
        id: 'dataset-link',
        type: 'markdown',
        content: '## Dataset Information\n\nDataset Source: [Purchase Data on Google Drive](https://drive.google.com/file/d/1bD4HNi_O5bmgrADcDQ5Lh1Y4NPPqPG0F/view)',
      },
      {
        id: 'imports',
        type: 'python',
        content: 'import pandas as pd\nimport numpy as np\nfrom scipy import stats\nfrom sklearn.preprocessing import LabelEncoder\nimport matplotlib.pyplot as plt\nimport seaborn as sns',
        explanation: 'We import essential libraries:\n- **pandas**: For data manipulation and analysis\n- **numpy**: For numerical operations\n- **scipy**: For statistical testing\n- **sklearn**: For data preprocessing (LabelEncoder)\n- **matplotlib & seaborn**: For data visualization',
      },
      {
        id: 'load-data',
        type: 'python',
        content: "df = pd.read_csv('/path/to/purchase_data.csv')\ndf.head()",
        explanation: 'Load the dataset and display the first few rows to understand its structure.',
      },
      {
        id: 'data-dict',
        type: 'markdown',
        content: '## Data Dictionary\n\n- **User_ID**: Unique identifier for each customer\n- **Product_ID**: Unique identifier for each product\n- **Gender**: Gender of the customer (M/F)\n- **Age**: Age group of the customer\n- **Occupation**: Occupation code of the customer\n- **City_Category**: Region category (A, B, C)\n- **Stay_In_Current_City_Years**: Years living in current city\n- **Marital_Status**: 0 = Single, 1 = Married\n- **Product_Category_1/2/3**: Product categories\n- **Purchase**: Purchase amount in currency units',
      },
      {
        id: 'eda',
        type: 'markdown',
        content: '## Exploratory Data Analysis (EDA)\n\n### Why EDA?\nBefore building any model or drawing conclusions, we need to:\n1. Understand the data structure\n2. Check for missing values (null values)\n3. Identify duplicates\n4. Detect outliers\n5. Understand distributions and relationships',
      },
      {
        id: 'check-info',
        type: 'python',
        content: 'df.info()',
        explanation: 'Check data types and missing values. This helps us understand what preprocessing is needed.',
      },
      {
        id: 'check-null',
        type: 'python',
        content: 'df.isnull().sum()',
        explanation: 'Identify how many missing values exist in each column. This is crucial for data quality assessment.',
      },
      {
        id: 'handle-missing',
        type: 'python',
        content: "# For categorical columns with missing values, we can fill with 0\ndf['Product_Category_2'] = df['Product_Category_2'].fillna(0)\ndf['Product_Category_3'] = df['Product_Category_3'].fillna(0)\n\n# Drop rows with remaining null values\ndf.dropna(inplace=True)",
        explanation: 'Handle missing data:\n- **For Product_Category_2 & 3**: Fill with 0 (indicating no secondary/tertiary category)\n- **Why?** Many products don\'t have secondary/tertiary categories\n- **Alternative rejected**: Deleting all rows with nulls would lose too much data\n- **Alternative considered**: Forward/backward fill - not suitable for categorical data',
      },
      {
        id: 'check-duplicates',
        type: 'python',
        content: 'df.duplicated().sum()',
        explanation: 'Check for duplicate rows. If same customer bought identical products, that\'s valid data, not a duplicate.',
      },
      {
        id: 'encoding-intro',
        type: 'markdown',
        content: '## Data Encoding\n\nWhy do we need to encode?\n- Machine learning models require numerical input\n- Categorical columns (Gender, City_Category) must be converted to numbers\n\n### Encoding Methods:\n1. **Label Encoding**: Converts to 0, 1, 2... (alphabetical order)\n2. **Ordinal Encoding**: Specific order (e.g., Low, Medium, High)\n3. **One-Hot Encoding**: Creates binary columns for each category',
      },
      {
        id: 'label-encoding',
        type: 'python',
        content: 'from sklearn.preprocessing import LabelEncoder\n\nencoding_dict = {}\nfor column in df.columns:\n    if df[column].dtype == "object":\n        le = LabelEncoder()\n        df[column] = le.fit_transform(df[column])\n        encoding_dict[column] = dict(zip(le.classes_, le.transform(le.classes_)))\n\nfor key, value in encoding_dict.items():\n    print(f"Mappings for {key}: {value}")',
        explanation: 'Apply Label Encoding to all categorical columns:\n- Store the mapping so we can interpret results later\n- Why Label Encoding? Simple, efficient, and works well for statistical tests\n- Why not One-Hot? Would create too many columns for this analysis',
      },
      {
        id: 'stats-intro',
        type: 'markdown',
        content: '## Statistical Hypothesis Testing\n\n### Steps in Hypothesis Testing:\n1. **Data Collection**: We have our dataset\n2. **Sample Preparation**: Extract relevant data subset\n3. **Hypothesis Formation**:\n   - **Null Hypothesis (H₀)**: No difference/relationship exists\n   - **Alternate Hypothesis (H₁)**: Difference/relationship exists\n4. **Apply Statistical Test**: Choose appropriate test\n5. **Interpret Results**:\n   - If p-value > 0.05: Fail to reject Null Hypothesis\n   - If p-value < 0.05: Reject Null Hypothesis (statistically significant)',
      },
      {
        id: 'hypothesis1-setup',
        type: 'markdown',
        content: '### Hypothesis 1: Is male 18-25 average purchase still 10,000?\n\nIt was observed historically that males aged 18-25 spent an average of 10,000. Is this still true?\n\n- **H₀**: Mean purchase = 10,000\n- **H₁**: Mean purchase ≠ 10,000\n- **Test**: One Sample T-Test',
      },
      {
        id: 'hypothesis1-code',
        type: 'python',
        content: 'from scipy.stats import ttest_1samp\n\n# Filter: Males (Gender=1), Age 18-25 (Age=1)\nmale_18_25 = df[(df["Gender"] == 1) & (df["Age"] == 1)]\n\n# Take a sample for statistical validity\nsample = male_18_25.sample(3600, random_state=0)\n\n# Perform one sample t-test\npopulation_mean = 10000\nt_statistic, p_value = ttest_1samp(sample["Purchase"], population_mean)\n\nprint(f"T-Statistic: {t_statistic}")\nprint(f"P-Value: {p_value}")\nprint(f"Sample Mean: {sample["Purchase"].mean()}")\n\nif p_value > 0.05:\n    print("\\n✓ Fail to reject Null Hypothesis: Mean is still approximately 10,000")\nelse:\n    print("\\n✗ Reject Null Hypothesis: Mean has significantly changed from 10,000")',
        explanation: '**One Sample T-Test**: Compare sample mean to known population mean\n\n**Why t-test?**\n- We\'re comparing one sample to a known value\n- Sample size < 30: t-test is more appropriate than z-test\n- Assumes normal distribution (valid for large samples)\n\n**Random State**: Ensures reproducibility\n\n**Interpretation**:\n- If p > 0.05: Historical average still holds\n- If p < 0.05: Customer behavior has changed',
      },
      {
        id: 'hypothesis2-setup',
        type: 'markdown',
        content: '### Hypothesis 2: Do men and women (18-25) spend equally?\n\nDo males and females in the 18-25 age group have the same average purchase amount?\n\n- **H₀**: Mean purchase (Males) = Mean purchase (Females)\n- **H₁**: Mean purchase (Males) ≠ Mean purchase (Females)\n- **Test**: Independent Two Sample T-Test',
      },
      {
        id: 'hypothesis2-code',
        type: 'python',
        content: 'from scipy.stats import ttest_ind\n\n# Filter data\nmale_18_25 = df[(df["Gender"] == 1) & (df["Age"] == 1)]\nfemale_18_25 = df[(df["Gender"] == 0) & (df["Age"] == 1)]\n\n# Create samples\nmale_sample = male_18_25.sample(3600, random_state=0)\nfemale_sample = female_18_25.sample(1100, random_state=0)\n\n# Check variances\nmale_variance = male_sample["Purchase"].var()\nfemale_variance = female_sample["Purchase"].var()\nprint(f"Male Variance: {male_variance}")\nprint(f"Female Variance: {female_variance}")\n\n# Perform two sample t-test (assuming equal variance)\nt_statistic, p_value = ttest_ind(male_sample["Purchase"], female_sample["Purchase"], equal_var=True)\n\nprint(f"\\nT-Statistic: {t_statistic}")\nprint(f"P-Value: {p_value}")\nprint(f"Male Mean: {male_sample["Purchase"].mean()}")\nprint(f"Female Mean: {female_sample["Purchase"].mean()}")\n\nif p_value > 0.05:\n    print("\\n✓ Fail to reject Null: Males and females spend similarly")\nelse:\n    print("\\n✗ Reject Null: Spending differs between genders")',
        explanation: '**Independent Two Sample T-Test**: Compare means of two independent groups\n\n**Why this test?**\n- Two separate groups (Male vs Female)\n- Testing if their means are equal\n- Assumes independence and normal distribution\n\n**Equal Variance Assumption**:\n- We set `equal_var=True` based on variance comparison\n- If variances are very different, use `equal_var=False` (Welch\'s t-test)\n\n**Why not reject based on variance difference?**\n- Small differences in variance are acceptable\n- t-test is robust to moderate variance differences with large samples',
      },
      {
        id: 'conclusion',
        type: 'markdown',
        content: '## Key Takeaways\n\n✅ **What we learned:**\n1. **Data Preprocessing**: Handle nulls, duplicates, and encoding\n2. **EDA**: Understand data before analysis\n3. **Hypothesis Testing**: Validate business assumptions\n4. **Statistical Interpretation**: Use p-values correctly\n\n⚡ **Key Statistical Concepts:**\n- Null vs Alternate hypotheses\n- P-values and significance levels\n- One-sample vs Two-sample tests\n- The importance of random sampling\n\n💡 **Real-World Application:**\n- Validate business assumptions before decisions\n- Use statistical tests to avoid biased conclusions\n- Always consider sample size and limitations',
      },
    ],
  },
];
