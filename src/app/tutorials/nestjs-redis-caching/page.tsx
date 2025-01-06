import { CodeBlock } from "@/components/ui/code-block";

export default function NestJSRedisCachingTutorial() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Redis Caching in NestJS: A Practical Guide</h1>

      <div className="prose max-w-none">
        <h2>Why Cache with Redis?</h2>
        <p>
          If you&apos;re building a NestJS app that needs to handle lots of requests or has expensive database queries,
          you&apos;re gonna want caching. Redis is perfect for this - it&apos;s blazing fast, easy to use, and NestJS
          has built-in support for it. Let me show you how to set it up!
        </p>

        <h2>Setting Up Redis</h2>
        <p>First, let&apos;s install the required packages:</p>

        <CodeBlock
          language="bash"
          code={`npm install @nestjs/cache-manager cache-manager cache-manager-redis-store redis`}
        />

        <p>If you&apos;re using TypeScript (and you probably are), you&apos;ll also want the types:</p>

        <CodeBlock language="bash" code={`npm install -D @types/cache-manager-redis-store`} />

        <h2>Basic Setup</h2>
        <p>
          First, register the cache module in your <code>app.module.ts</code>:
        </p>

        <CodeBlock
          language="typescript"
          code={`import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60 * 60, // Time to live in seconds (1 hour)
    }),
  ],
})
export class AppModule {}`}
        />

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Pro Tip:</strong> In production, you&apos;ll want to load Redis config from environment variables.
            I&apos;ll show you how later!
          </p>
        </div>

        <h2>Basic Caching</h2>
        <p>Here&apos;s a simple example using caching in a service:</p>

        <CodeBlock
          language="typescript"
          code={`import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getUser(id: number) {
    // Try to get user from cache first
    const cachedUser = await this.cacheManager.get(\`user-\${id}\`);
    if (cachedUser) {
      return cachedUser;
    }

    // If not in cache, get from database
    const user = await this.findUserInDb(id);
    
    // Store in cache for next time
    await this.cacheManager.set(\`user-\${id}\`, user);
    
    return user;
  }
}`}
        />

        <h2>Using Cache Decorators</h2>
        <p>NestJS provides some cool decorators to make caching even easier:</p>

        <CodeBlock
          language="typescript"
          code={`import { CacheKey, CacheTTL, UseInterceptors, CacheInterceptor } from '@nestjs/common';

@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
  @Get(':id')
  @CacheKey('user-profile')
  @CacheTTL(30) // Cache for 30 seconds
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
}`}
        />

        <h2>Advanced Caching Patterns</h2>
        <p>Here are some real-world patterns I use all the time:</p>

        <h3>1. Cache with Dynamic Keys</h3>
        <CodeBlock
          language="typescript"
          code={`@Injectable()
export class ProductService {
  @Inject(CACHE_MANAGER) private cacheManager: Cache;

  async getProducts(category: string, page: number) {
    const cacheKey = \`products-\${category}-\${page}\`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const products = await this.findProducts(category, page);
    await this.cacheManager.set(cacheKey, products, 1800); // 30 minutes
    
    return products;
  }
}`}
        />

        <h3>2. Cache Invalidation</h3>
        <CodeBlock
          language="typescript"
          code={`@Injectable()
export class ProductService {
  async updateProduct(id: number, data: UpdateProductDto) {
    // Update in database
    const updated = await this.productRepo.update(id, data);
    
    // Invalidate related caches
    await this.cacheManager.del(\`product-\${id}\`);
    await this.cacheManager.del('products-list');
    
    return updated;
  }
}`}
        />

        <h3>3. Batch Cache Operations</h3>
        <CodeBlock
          language="typescript"
          code={`@Injectable()
export class CacheService {
  async clearProductCaches(productIds: number[]) {
    const keys = productIds.map(id => \`product-\${id}\`);
    await Promise.all(keys.map(key => this.cacheManager.del(key)));
  }

  async getCachedProducts(ids: number[]) {
    const keys = ids.map(id => \`product-\${id}\`);
    const cached = await Promise.all(
      keys.map(key => this.cacheManager.get(key))
    );
    return cached.filter(Boolean);
  }
}`}
        />

        <h2>Production Setup</h2>
        <p>Here&apos;s how to set up Redis caching for production:</p>

        <CodeBlock
          language="typescript"
          code={`// config/cache.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD,
  ttl: parseInt(process.env.CACHE_TTL, 10) || 3600,
  max: parseInt(process.env.CACHE_MAX, 10) || 100,
}));

// app.module.ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import cacheConfig from './config/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cacheConfig],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('cache.host'),
        port: configService.get('cache.port'),
        password: configService.get('cache.password'),
        ttl: configService.get('cache.ttl'),
        max: configService.get('cache.max'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}`}
        />

        <h2>Best Practices</h2>
        <ul>
          <li>Use meaningful cache keys that include relevant parameters</li>
          <li>Set appropriate TTL values based on how often your data changes</li>
          <li>Implement cache invalidation when data is updated</li>
          <li>Use environment variables for Redis configuration</li>
          <li>Add error handling for cache operations</li>
        </ul>

        <h2>Error Handling</h2>
        <p>Always handle cache errors gracefully:</p>

        <CodeBlock
          language="typescript"
          code={`@Injectable()
export class UserService {
  async getUser(id: number) {
    try {
      const cached = await this.cacheManager.get(\`user-\${id}\`);
      if (cached) return cached;
    } catch (error) {
      // Log error but don't fail the request
      console.error('Cache error:', error);
      // Continue without cache
    }

    // Fallback to database
    return this.findUserInDb(id);
  }
}`}
        />

        <h2>Monitoring and Debugging</h2>
        <p>Here&apos;s a simple cache monitor service I use in development:</p>

        <CodeBlock
          language="typescript"
          code={`@Injectable()
export class CacheMonitorService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCacheStats() {
    const store = this.cacheManager.store;
    
    return {
      keys: await store.keys(),
      memory: await store.getStats(),
    };
  }

  async clearAll() {
    return this.cacheManager.reset();
  }
}`}
        />

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
          <p className="text-sm text-orange-700">
            <strong>Quick Tip:</strong> In development, I often set shorter TTL values (like 30 seconds) to make testing
            easier. Just remember to update them for production!
          </p>
        </div>

        <h2>Common Gotchas</h2>
        <ul>
          <li>
            <strong>Circular Dependencies:</strong> Be careful when caching objects with circular references - they
            won&apos;t serialize properly
          </li>
          <li>
            <strong>Memory Usage:</strong> Set reasonable TTL and max values to prevent Redis from using too much memory
          </li>
          <li>
            <strong>Cache Stampede:</strong> When cache expires, multiple requests might try to rebuild it
            simultaneously. Consider implementing a cache lock pattern
          </li>
          <li>
            <strong>Type Safety:</strong> Redis stores everything as strings, so make sure to handle type conversion
            properly
          </li>
        </ul>

        <h2>Wrapping Up</h2>
        <p>
          That&apos;s it! You now have a solid foundation for implementing Redis caching in your NestJS app. Remember,
          caching is an optimization - start simple and add complexity only when needed. If you run into issues or have
          questions, check out the{" "}
          <a
            href="https://docs.nestjs.com/techniques/caching"
            className="text-orange-600 hover:text-orange-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            NestJS caching docs
          </a>{" "}
          or drop a comment below!
        </p>
      </div>
    </div>
  );
}
