import React, { FC, createElement } from 'react';
import { MDXNodeWalker } from '../mdx-node-walker';

describe('MDXNodeWalker', () => {
  const TestA: FC<any> = ({ children }) => <>{children}</>;
  const TestB: FC<any> = ({ children }) => <TestA>{children}</TestA>;
  const TestC: FC<any> = ({ children }) => <TestB>{children}</TestB>;

  let walker: MDXNodeWalker;

  beforeEach(() => {
    walker = new MDXNodeWalker({
      TestA,
      TestB,
      TestC,
    });
  });

  test('Replaced with ReactElement based on mdxType.', () => {
    const node = walker.walk({
      type: 'Dummy',
      props: {
        mdxType: 'TestA',
        originalType: 'Dummy',
      },
    });
    expect(node).toStrictEqual(<TestA />);
  });

  test('Children are also replaced on mdxType.', () => {
    const node = walker.walk({
      type: 'Dummy',
      props: {
        mdxType: 'TestA',
        originalType: 'Dummy',
        children: [
          {
            $$typeof: Symbol.for('react.element'),
            type: 'Dummy',
            props: {
              mdxType: 'TestA',
              originalType: 'Dummy',
            },
          },
          {
            $$typeof: Symbol.for('react.element'),
            type: 'Dummy',
            props: {
              mdxType: 'TestC',
              originalType: 'Dummy',
            },
          },
        ],
      },
    });
    expect(node).toStrictEqual(
      <TestA>
        <TestA />
        <TestC />
      </TestA>,
    );
  });

  test('Children are replaced on type.', () => {
    const node = walker.walk(createElement(TestA, {}, createElement(TestA, {}), createElement(TestC, {})));
    expect(node).toStrictEqual(
      <TestA>
        <TestA />
        <TestC />
      </TestA>,
    );
  });
  test('Children are replaced on type and mdxType.', () => {
    const node = walker.walk(
      createElement(TestA, {}, createElement(TestA, {}), {
        $$typeof: Symbol.for('react.element'),
        type: 'Dummy',
        props: {
          mdxType: 'TestC',
          originalType: 'Dummy',
        },
      }),
    );
    expect(node).toStrictEqual(
      <TestA>
        <TestA />
        <TestC />
      </TestA>,
    );
  });
});
