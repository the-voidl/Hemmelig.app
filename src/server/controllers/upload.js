const { download, remove } = require('../services/file-adapter');
const redis = require('../services/redis');

// https://stackabuse.com/uploading-files-to-aws-s3-with-node-js
async function uploadFiles(fastify) {
    fastify.post(
        '/download',
        {
            preValidation: [fastify.authenticate],
        },
        async (request, reply) => {
            const { key, encryptionKey, secretId, ext, mime } = request.body;

            const preventBurn = (await redis.getSecretKey(secretId, 'preventBurn')) === 'true';

            const file = await download(key, encryptionKey);

            if (!preventBurn) {
                await remove(key);
            }

            return reply
                .header('Content-Disposition', `attachment; filename=${secretId}.${ext}`)
                .type(mime)
                .code(200)
                .send(file);
        }
    );
}

module.exports = uploadFiles;
