Project Overview

This application allows users to upload a PDF and receive AI-generated insights such as summaries or extracted information.

The goal of this project is to demonstrate how AI can be used to process unstructured documents and generate meaningful outputs for users.

This project is an extension of Assignment 5, with added evaluation, analysis, and system improvements.

⚙️ Architecture
✅ Architecture Type: Hybrid (Prompt-first + Tool-first)
✔️ Why this architecture?
The system first uses a tool-based step to extract text from PDFs
Then it uses a prompt-based approach to send that text to an AI model
✔️ Tradeoffs
Context limits → Large PDFs cannot fully fit into model input
Performance → Slower for large files
Cost → Larger inputs increase API usage cost
Debugging difficulty → AI outputs are not deterministic
No long-term memory → Each request is independent
🚫 Alternative Not Chosen
Retrieval-Augmented Generation (RAG)

RAG was considered but not implemented.

Would allow handling larger PDFs by retrieving relevant chunks
Requires vector database and chunking logic
Adds complexity and operational overhead
✔️ When it would be used

If the application needs to:

Handle large PDFs
Support multiple documents
Improve accuracy for long content
🔄 System Pipeline / Data Flow
Step-by-step flow:
User uploads a PDF file
The system extracts text from the PDF
Text is cleaned and formatted
A prompt is constructed using the extracted text
The prompt is sent to the AI model
The AI generates a response
The response is displayed in the UI
📊 Data Handling
Input
PDF file uploaded by user
Transformations
Text extraction from PDF
Basic cleaning and formatting
Model Input
Prompt + extracted text
Output
AI-generated summary or extracted information
⚠️ Potential Error Points
PDF parsing may fail for complex layouts
Large PDFs may exceed context limits
AI output may be incomplete or inconsistent
📈 Evaluation
1. Output Quality
Case	Input Type	Result
Case 1	Small PDF	Accurate summary
Case 2	Medium PDF	Good structure
Case 3	Resume PDF	Partial extraction
Case 4	Academic PDF	Clear summary
Case 5	Mixed content	Moderate quality
2. End-to-End Task Success

The system successfully:

Accepts PDF input
Processes text
Generates meaningful output
Displays results to the user

Failures occur mainly with:

Large documents
Complex formatting
3. Upstream Component Evaluation (PDF Parsing)
Works well for simple text PDFs
Struggles with:
Tables
Multi-column layouts
Images
❌ Failure Cases
Case	Issue
Large PDF	Output is truncated or incomplete
Complex layout	Important content is missed
⚖️ Baseline Comparison
Baseline Approach
Sending raw extracted text directly to model
Improved Approach
Cleaned text + structured prompt
Result
Improved readability
Better structured outputs
More relevant summaries
🔧 Improvement Made
Problem Identified

Outputs were inconsistent and sometimes unclear.

Improvement
Enhanced prompt with structured instructions
Added formatting expectations (bullet points, clarity)
Impact
More readable outputs
Better consistency
Improved user experience
🚀 Future Improvements
Implement RAG for large document handling
Improve PDF parsing for complex layouts
Add support for multiple document comparison
Store processing logs for debugging and evaluation
