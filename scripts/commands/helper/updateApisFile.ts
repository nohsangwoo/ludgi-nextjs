import fs from 'fs'
import path from 'path'

const updateApisFile = async () => {
  const apisPath = path.join(process.cwd(), 'src/graphql/apis.ts')
  const graphqlTsPath = path.join(process.cwd(), 'src/generated/graphql.ts')

  // Read graphql.ts content
  const graphqlContent = fs.readFileSync(graphqlTsPath, 'utf-8')

  // Extract getSdk function content
  const getSdkPattern =
    /export function getSdk\(.*?\)\s*{([\s\S]*?)return \{([\s\S]*?)\};/
  const getSdkMatch = getSdkPattern.exec(graphqlContent)

  if (!getSdkMatch) {
    throw new Error('getSdk function not found in graphql.ts')
  }

  const getSdkContent = getSdkMatch[2]

  // Extract function names from getSdk return object, excluding "withWrapper"
  const functionNamePattern = /\b(\w+)\s*\(/g
  const functionNames = Array.from(getSdkContent.matchAll(functionNamePattern))
    .map(match => match[1])
    .filter(name => name !== 'withWrapper')

  // Generate updated content for apis.ts
  const apisContent = `import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';
import { API_URL } from '../../server/lib/consts';
  
const gqlClient = new GraphQLClient(API_URL);
  
export const {
  ${functionNames.join(',\n  ')}
  } = getSdk(gqlClient);
  `

  // Write the updated content to apis.ts
  fs.writeFileSync(apisPath, apisContent, 'utf-8')
  console.log('apis.ts file has been updated successfully!')
}

export default updateApisFile
