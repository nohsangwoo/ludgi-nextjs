import type { Context } from '../type';
import { ZxTestMutationVariables } from '../../generated/graphql';
import { $ } from 'zx';

const resolvers = {
  Mutation: {
    zxTest: async (
      _parent: unknown,
      args: ZxTestMutationVariables,
      context: Context,
    ) => {
      // 이런 zx를 이용하려면 방어코드가 필수적임.
      // 허용된 명령어 리스트를 정의하고, 미리 정의된 안전한 명령어만 실행하는 것이 좋음.
      // 1. 허용된 명령어 리스트 정의 후 사용
      // const ALLOWED_COMMANDS = ['package-name', 'version']  // 예시

      const zxResult = await $`cat package.json | grep name`;
      console.log('cmd: ', zxResult);

      const stdout = zxResult.stdout;
      const stderr = zxResult.stderr;
      const duration = zxResult.duration;

      const result = {
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        duration: duration,
      };

      return {
        ok: true,
        error: null,
        result,
      };
    },
  },
};

export default resolvers;
