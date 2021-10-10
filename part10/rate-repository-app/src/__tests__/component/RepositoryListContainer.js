import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const RepositoryList = ({ repositories }) => {
        console.log("FULL NAME", repositories)
        repositories.forEach(n => console.log(n.node))
    return (
        <View>
            {repositories.map(repo => {
                const { fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount } = repo.node
                return (
                    <View testID="repo" > 
                        <Text testID="fullName" > Full Name: {fullName} </Text>
                        <Text testID="description" > Description: {description} </Text>
                        <Text testID="language" > Language: {language} </Text>
                        <Text testID="forksCount" > Forks Count: {forksCount} </Text>
                        <Text testID="stargazersCount" > Stargazers Count: {stargazersCount} </Text>
                        <Text testID="ratingAverage" > Rating Average: {ratingAverage} </Text>
                        <Text testID="reviewCount" > Review Count: {reviewCount} </Text>
                    </View>
                )
            }) }
        </View>
    );
};

describe('RepositoryList', () => {

    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {

        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
  
        // Add your test code here
        const { debug, getAllByTestId } = render(<RepositoryList repositories={repositories.edges} />)
        
        debug()

        expect(getAllByTestId("repo").length).toBe(2);
        expect(getAllByTestId("fullName")[0]).toHaveTextContent("Full Name: jaredpalmer/formik");
        expect(getAllByTestId("fullName")[1]).toHaveTextContent("Full Name: async-library/react-async");

        expect(getAllByTestId("description")[0]).toHaveTextContent("Description: Build forms in React, without the tears");

        expect(getAllByTestId("language")[1]).toHaveTextContent("Language: JavaScript");

        expect(getAllByTestId("forksCount")[0]).toHaveTextContent("Forks Count: 1619");

        expect(getAllByTestId("stargazersCount")[1]).toHaveTextContent("Stargazers Count: 1760");

        expect(getAllByTestId("ratingAverage")[0]).toHaveTextContent("Rating Average: 88");

        expect(getAllByTestId("reviewCount")[1]).toHaveTextContent("Review Count: 3");

      });
    });

  });