
import React, { useState } from 'react';
import { Search, Book, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BookView from '@/components/BookView';
import ThemeToggle from '@/components/ThemeToggle';

const realBooks = [
]

// Example book data structure
const sampleBooks = [
  {
    id: 1,
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    description: "Principles for creating simpler, more maintainable software systems.",
    totalReadTime: "21 min", // Sum of read_time_min from all chapters
    rating: 5.0, // Assuming a high rating for a well-structured book on design
    chapters: [
      {
        id: 1,
        title: "Chapter 1: It's All About Complexity",
        summary: "Introduces the core idea that software design is fundamentally about managing complexity. The goal is to minimize overall system complexity by making code simpler, obvious, and encapsulated in modules. Design is never finished, and developers should continuously refine their code; the book notes that it's often easier to see problems in others' code than in one's own.",
        bulletPoints: [
          "Fight complexity by writing simpler, more obvious code and by encapsulating complexity in well-defined modules.",
          "Accept that design is never done; continuously improve your code instead of treating it as finished.",
          "Recognize design issues in code and refactor them, noting it’s usually easier to spot problems in others’ code than in your own."
        ],
        quotes: [
          "This book is about how to design software systems to minimize their complexity."
        ],
        readTime: "1 min",
        importance: 5
      },
      {
        id: 2,
        title: "Chapter 2: The Nature of Complexity",
        summary: "Defines complexity as structural aspects of software that make it hard to understand or modify. Complexity manifests in change amplification, high cognitive load, and 'unknown unknowns'. Since complexity accumulates incrementally, the chapter recommends a 'zero tolerance' mindset to minimize it, aiming to keep the system as obvious as possible.",
        bulletPoints: [
          "Complexity is anything that makes code harder to understand or modify.",
          "Symptoms of complexity include change amplification (small changes affecting many parts), high cognitive load, and unknown unknowns.",
          "Complexity stems from hidden dependencies and obscurity; good design forces code to be obvious and simple.",
          "Adopt a 'zero tolerance' approach to complexity: continuously refactor and simplify to prevent small issues from accumulating."
        ],
        quotes: [
          "Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system.",
          "In order to slow the growth of complexity, you must adopt a \"zero tolerance\" philosophy."
        ],
        readTime: "2 min",
        importance: 5
      },
      {
        id: 3,
        title: "Chapter 3: Working Code Isn't Enough",
        summary: "Emphasizes that shipping working code is not the ultimate goal. Developers should think strategically and invest in design for the long term. Unnecessary shortcuts for short-term gains can lead to brittle systems. The chapter contrasts tactical (short-term) and strategic (long-term) approaches, advocating regular small design investments to avoid technical debt.",
        bulletPoints: [
          "Do not equate working code with success; aim to build a solid design that will endure and evolve.",
          "Balance tactical fixes with strategic investments: continuously refactor and improve the design to avoid technical debt.",
          "Understand that quick hacks may solve the immediate problem but often create future complexity; focus on sustainable solutions."
        ],
        quotes: [
          "Your primary goal must be to produce a great design, which also happens to work."
        ],
        readTime: "1 min",
        importance: 5
      },
      {
        id: 4,
        title: "Chapter 4: Modules Should Be Deep",
        summary: "Advocates designing modules with simple interfaces but potentially complex implementations. Deep modules hide complexity inside, reducing what the rest of the system needs to know. This simplifies maintenance: changes inside a module rarely propagate outward. The chapter also warns against 'classitis' – over-fragmenting logic into many shallow classes, which can increase overall complexity.",
        bulletPoints: [
          "A deep module exposes a concise interface while hiding detailed logic in its implementation.",
          "This minimizes the module’s impact on other code: implementation changes usually don’t affect users of the module.",
          "Avoid creating many tiny classes ('classitis'); sometimes larger, deeper modules with simpler interfaces reduce complexity."
        ],
        quotes: [
          "The best modules are those whose interfaces are much simpler than their implementations."
        ],
        readTime: "1 min",
        importance: 5
      },
      {
        id: 5,
        title: "Chapter 5: Information Hiding (and Leakage)",
        summary: "Information hiding is a key technique to achieve deep modules. Each module should hide its implementation details and present a minimal interface. Conversely, 'information leakage' (when shared knowledge crosses module boundaries) increases complexity and coupling. The chapter advises reorganizing code so that shared data or knowledge resides in only one place.",
        bulletPoints: [
          "Encapsulate implementation details inside modules; expose only what is necessary in the interface.",
          "Identify and eliminate information leakage (shared data/knowledge across modules), as it creates hidden dependencies.",
          "Instead of splitting related functionality into tiny modules, consider combining them so a single module can hide more complexity.",
          "Avoid organizing code strictly by execution order (temporal decomposition); instead group code by related responsibilities."
        ],
        quotes: [
          "Information hiding and deep modules are closely related. If a module hides a lot of information, that tends to increase the functionality it provides while reducing its interface (making the module deeper)."
        ],
        readTime: "1 min",
        importance: 5
      },
      {
        id: 6,
        title: "Chapter 6: General-Purpose Modules Are Deeper",
        summary: "Explores the balance between special-purpose and general-purpose designs. It suggests building modules that meet current needs but have interfaces general enough for future uses. General-purpose modules typically have simpler, more abstract interfaces. The chapter advises finding a 'sweet spot' – enough generality to allow reuse without overcomplicating the API.",
        bulletPoints: [
          "Design modules to be 'somewhat general-purpose': meet today’s requirements with an interface that can serve future needs.",
          "A more general interface is often simpler overall, improving information hiding and flexibility.",
          "Check that your interface is as small as possible for current use; if it’s too narrow, it may need to be generalized.",
          "Avoid making interfaces so broad that they become hard to use for current needs; find the right middle ground."
        ],
        quotes: [
          "In my experience, the sweet spot is to implement new modules in a somewhat general-purpose fashion... the interface should be general enough to support multiple uses."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 7,
        title: "Chapter 7: Different Layer, Different Abstraction",
        summary: "Argues that each layer in a system should introduce a new abstraction; if adjacent layers expose the same interface, the design is flawed. To avoid this, eliminate 'pass-through' code: methods or decorator classes that only forward calls without adding value. Each layer/method should contribute new functionality or a distinct abstraction.",
        bulletPoints: [
          "Each layer should present a unique abstraction level; identical interfaces across layers indicate poor separation of concerns.",
          "Avoid 'pass-through' methods that simply delegate; every method should add meaningful behavior.",
          "Decorator classes often introduce many trivial pass-through calls for little benefit; use them sparingly.",
          "Eliminate pass-through variables (state passed through multiple layers) by using shared context objects or restructuring code."
        ],
        quotes: [
          "In a well-designed system, each layer should provide a different abstraction than the layer above or below it.",
          "Pass-through methods do not provide additional functionality; thus they are bad."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 8,
        title: "Chapter 8: Pull Complexity Downwards",
        summary: "Discusses making modules easier to use by handling complexity internally. Instead of exposing configuration for everything, a module should incorporate reasonable defaults and do work behind the scenes. By 'pulling complexity downwards,' you present a simpler interface to users even if the module’s internal logic is more complex.",
        bulletPoints: [
          "Make modules as easy to use as possible by moving complexity inside them ('pull complexity downwards').",
          "Provide sensible defaults and avoid giving users too many configuration knobs, as that pushes complexity onto the user.",
          "Ensure that moving complexity down actually reduces overall system complexity; simplify interfaces for common use cases.",
          "Remember: most modules have more users than developers, so prioritize consumer simplicity over developer convenience."
        ],
        quotes: [
          "One should handle complexity internally within the module when possible, which means that we are pulling complexity downwards."
        ],
        readTime: "1 min",
        importance: 4
      },
      {
        id: 9,
        title: "Chapter 9: Better Together or Better Apart?",
        summary: "Explores when to combine versus split code. Generally, keep components together if they share data, are used together, or overlap conceptually. This can simplify the interface and reduce duplication. However, unnecessary fragmentation adds coordination overhead. The book notes that long methods are acceptable if their interface is simple; a long method is effectively 'deep' if it completes one cohesive task.",
        bulletPoints: [
          "Group related functionality when components share data, usage patterns, or are conceptually linked.",
          "Split code when doing so reduces overall complexity (e.g., to avoid duplicated logic) or when components are truly independent.",
          "Each method should complete a single task; long methods are acceptable if they remain straightforward to read.",
          "Avoid spreading tightly-coupled logic across modules, as that increases cognitive load for developers."
        ],
        quotes: [
          "Pieces of code should be kept together if they share the same information, are used together, or overlap conceptually.",
          "A method containing hundreds of lines of code is fine if it has a simple signature, because then it is effectively 'deep'."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 10,
        title: "Chapter 10: Define Errors Out of Existence",
        summary: "Covers exception-handling strategies. Ousterhout argues that exceptions disproportionately increase complexity. The best approach is to 'define errors out of existence': design APIs so that common error cases become no-ops. For example, an 'unset' operation can safely do nothing if the variable doesn’t exist. Other tactics include masking exceptions at lower levels and aggregating multiple exceptions into a single handler.",
        bulletPoints: [
          "Design functions so that error conditions become benign: e.g., redefine 'unset' to ensure a variable is gone without error if absent.",
          "Use exception masking: let lower-level code handle recoverable errors so higher-level code isn't cluttered.",
          "Use exception aggregation: combine handling of similar exceptions into one catch block to simplify error logic.",
          "Consider fail-fast (crash) for truly unexpected errors rather than scattering complex recovery code everywhere."
        ],
        quotes: [
          "The best way to eliminate exception handling complexity is to define your APIs so that there are no exceptions to handle.",
          "He calls this 'define errors out of existence', meaning redesigning operations (like 'unset') so they safely do nothing instead of throwing an error."
        ],
        readTime: "1 min",
        importance: 4
      },
      {
        id: 11,
        title: "Chapter 11: Design It Twice",
        summary: "Recommends generating multiple design solutions for each problem. Since first ideas are rarely optimal, comparing radically different approaches leads to better outcomes. Even if one solution seems obvious, sketching an alternative (even a 'bad' one) can reveal hidden trade-offs and improve the final design.",
        bulletPoints: [
          "For important design problems, create at least two distinct designs and compare them.",
          "Use alternate designs to identify trade-offs; understanding each approach’s weaknesses helps refine the final solution.",
          "Even a deliberately bad design can highlight what’s missing from the first one."
        ],
        quotes: [
          "You’ll end up with a much better result if you consider multiple options for each major design decision: design it twice."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 12,
        title: "Chapter 12: Why Write Comments? The Four Excuses",
        summary: "Discusses the value of comments. It notes that code alone often isn't enough to express design or intent: 'If users must read the code of a method to use it, then there is no abstraction'. The chapter debunks common excuses for skipping comments (code self-documenting, no time, stale comments, comments are worthless) and shows that writing comments actually helps clarify and improve design.",
        bulletPoints: [
          "Without comments, the only 'abstraction' of a method is its declaration, which lacks crucial information.",
          "Common excuses for not writing comments are addressed and refuted.",
          "Writing comments forces you to think about design and abstractions explicitly.",
          "Treat comments as part of the development process, not an afterthought."
        ],
        quotes: [
          "If users must read the code of a method in order to use it, then there is no abstraction: all of the complexity of the method is exposed."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 13,
        title: "Chapter 13: Comments Should Describe Things That Aren't Obvious",
        summary: "Guides writing useful comments. Comments should explain non-obvious aspects of the code. A guiding principle is: 'Comments should describe things that aren’t obvious from the code'. After writing a comment, ensure a reader couldn’t have written that comment just by reading the code; if they could, the comment isn't needed. Good comments add precision or intuition beyond what code provides.",
        bulletPoints: [
          "Write comments only for hidden or complex behavior not clear from the code itself.",
          "Avoid comments that merely restate code; they should add understanding or context.",
          "Comments can operate at different levels (low-level explanation vs high-level rationale) depending on what's needed.",
          "Focus comments on explaining intent, design decisions, and rationale, not on rewriting the code logic."
        ],
        quotes: [
          "Comments should describe things that aren’t obvious from the code."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 14,
        title: "Chapter 14: Choosing Names",
        summary: "Stresses the importance of naming. A good name should create a clear mental image for the reader and indicate what the thing is (and what it isn't). Well-chosen names serve as documentation. If it’s hard to pick a simple name, that often signals a design issue. Ultimately, code readability is judged by the reader – if others find names cryptic, use more descriptive names.",
        bulletPoints: [
          "Names are a form of documentation: choose precise, descriptive names that convey purpose.",
          "Imagine a reader seeing the name in isolation: can they guess its meaning? If not, pick a better name.",
          "Be consistent in naming; if choosing a name is difficult, reconsider the design complexity.",
          "Prefer clarity over brevity: a slightly longer, clear name is better than a cryptic short one."
        ],
        quotes: [
          "When choosing a name, the goal is to create an image in the mind of the reader about the nature of the thing being named... A good name conveys a lot of information about what the underlying entity is."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 15,
        title: "Chapter 15: Write the Comments First",
        summary: "Recommends writing comments before code. Delaying documentation often means it never happens. By writing comments first, you clarify and refine abstractions up front, which improves the system design. This aligns comment-writing with strategic design, making it part of the enjoyable development process.",
        bulletPoints: [
          "Writing comments first makes documentation part of the design process, ensuring it actually gets done.",
          "Early comments help you identify and refine abstractions before writing code.",
          "Comments first aligns coding with strategic thinking: design comes before implementation.",
          "Comments written up front establish the API and expectations for the code to follow."
        ],
        quotes: [
          "The second, and most important, benefit of writing the comments at the beginning is that it improves the system design. Comments provide the only way to fully capture abstractions..."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 16,
        title: "Chapter 16: Modifying Existing Code",
        summary: "Offers guidelines for refactoring. After a change, the codebase should look as if it had been originally designed with that change in mind. 'If you’re not making the design better, you are probably making it worse'. Keep comments with the code so they stay up to date, rather nullthan relying on commit messages for explanations.",
        bulletPoints: [
          "After each change, the system should seem designed that way from the start.",
          "Avoid changes that don't improve structure; if a change doesn’t enhance the design, it likely harms it.",
          "Keep comments next to the code they describe so they are updated together; don’t put critical info only in commit logs.",
          "Use refactoring as an ongoing practice: each change is an opportunity to clean and simplify."
        ],
        quotes: [
          "If you’re not making the design better, you are probably making it worse."
        ],
        readTime: "1 min",
        importance: 3
      },
      {
        id: 17,
        title: "Chapter 17: Consistency",
        summary: "Emphasizes adhering to existing conventions. Unnecessarily changing naming or style just adds confusion. Consistent naming and formatting reduce cognitive load and make code predictable. Small inconsistencies can indicate larger design issues.",
        bulletPoints: [
          "Follow established conventions; avoid inventing new ones without good reason.",
          "Consistent naming and formatting make code more predictable and easier to read.",
          "Uniform style helps highlight anomalies that may point to bugs or design problems.",
          "Deviating from convention usually costs more in confusion than it gains in novelty."
        ],
        quotes: [
          "Good names are a form of documentation: they make code easier to understand."
        ],
        readTime: "1 min",
        importance: 2
      },
      {
        id: 18,
        title: "Chapter 18: Code Should Be Obvious",
        summary: "States that code must be self-explanatory: a reader’s first impression should be correct. If someone finds code unclear, it needs improvement. The lesson is to simplify code so that its behavior and intent are immediately apparent.",
        bulletPoints: [
          "Write code so clear that its purpose and behavior are evident on first reading.",
          "If a reader thinks the code isn’t obvious, treat that as a signal to refactor it.",
          "Minimize hidden assumptions: obvious code avoids subtle bugs.",
          "Strive for a simple, clean expression of logic rather than clever or dense constructs."
        ],
        quotes: [
          "If code is obvious, someone can read the code quickly, without much thought, and their first guesses about the behaviour or meaning of the code will be correct."
        ],
        readTime: "1 min",
        importance: 5
      },
      {
        id: 19,
        title: "Chapter 19: Software Trends",
        summary: "Discusses industry trends like testing and agile. It praises automated tests (which facilitate refactoring) but criticizes test-driven development for being too incremental, noting it focuses on making features work rather than finding the best design. It notes that practices like TDD and some agile methods can encourage a tactical mindset, so developers should maintain a strategic approach regardless.",
        bulletPoints: [
          "Automated tests (unit tests) are valuable for safely changing code and enabling refactoring.",
          "Be cautious: Test-Driven Development can reinforce tactical thinking by prioritizing the next feature over overall design.",
          "Recognize that some trends (Agile, TDD) emphasize short-term work; maintain discipline to think long-term.",
          "Use tests as a safety net, but don’t let tests dictate the architecture prematurely."
        ],
        quotes: [
          "Test-driven development focuses on getting specific features working rather than finding the best design. It’s tactical programming pure and simple."
        ],
        readTime: "1 min",
        importance: 2
      },
      {
        id: 20,
        title: "Chapter 20: Designing for Performance",
        summary: "Warns against premature optimization. Intuitive guesses about performance bottlenecks are often wrong. The chapter advises profiling to find true bottlenecks and focusing on the critical path. Otherwise you risk 'wasting time on things that don’t actually improve performance' and adding unnecessary complexity.",
        bulletPoints: [
          "Don’t optimize based on guesses; use measurements to identify real performance issues.",
          "Focus on optimizing the code’s critical paths rather than non-critical sections.",
          "Remember that simpler code often runs adequately fast; measure before making complex changes.",
          "Avoid premature optimization: complexity added for performance should be justified by real gains."
        ],
        quotes: [
          "Programmers' intuitions about performance are unreliable... If you start making changes based on intuition, you’ll waste time on things that don’t actually improve performance, and you’ll probably make the system more complicated."
        ],
        readTime: "1 min",
        importance: 2
      },
      {
        id: 21,
        title: "Chapter 21: Conclusion",
        summary: "Concludes by contrasting good and bad design. It notes that neglecting design leads to 'complicated and brittle code' that consumes maintenance time. In contrast, emphasizing simplicity and clean design results in more reliable, maintainable software. Reinforces the book’s core message that reducing complexity is paramount.",
        bulletPoints: [], // The summary provided doesn't have bullet points
        quotes: [], // The summary provided doesn't have quotes
        readTime: "1 min", // Assuming 1 minute for a conclusion
        importance: 5 // High importance for a conclusion chapter
      }
    ]
  },
  {
    id: 2, // Assign a new unique ID
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    description: "Principles for building reliable, scalable, and maintainable data systems.", // Derived from the category and general topic
    totalReadTime: "185 min", // Sum of read_time_minutes from all chapters
    rating: 4.9, // A high rating for a well-regarded technical book
    chapters: [
      {
        id: 1,
        title: "Reliable, Scalable, and Maintainable Applications",
        summary: "Introduces the goals of reliability, scalability, and maintainability in modern data systems. These guide the architectural choices throughout the book. The chapter defines each goal, explores challenges like fault tolerance and latency, and outlines key metrics like response time percentiles.",
        bulletPoints: [
          "Reliability involves withstanding hardware, software, and human faults.",
          "Scalability depends on understanding load parameters and response time percentiles.",
          "Maintainability includes operability, simplicity, and evolvability.",
          "Performance metrics include percentiles (p50, p99) and throughput."
        ],
        quotes: [
          "\"Reliability means making systems work correctly, even when faults occur.\"",
          "\"In a scalable system, you can add processing capacity in order to remain reliable under high load.\"",
          "\"Maintainability is about making life better for the engineering and operations teams who need to work with the system.\""
        ],
        readTime: "12 min",
        importance: 10
      },
      {
        id: 2,
        title: "Data Models and Query Languages",
        summary: "Compares major data models (relational, document, graph) and their query languages. Discusses how each fits various applications and data structures. Highlights NoSQL's emergence, trade-offs in flexibility and consistency, and the rise of declarative query languages.",
        bulletPoints: [
          "Relational model with SQL is still dominant but not always ideal.",
          "Document databases (e.g., MongoDB) are great for nested, self-contained data.",
          "Graph databases support complex relationships (e.g., Cypher, SPARQL).",
          "Query language styles include declarative, procedural, and logic-based (e.g., Datalog)."
        ],
        quotes: [
          "\"Data models are perhaps the most important part of developing software.\"",
          "\"Document and graph databases typically don’t enforce a schema, which can ease application evolution.\"",
          "\"Different systems for different purposes—not a one-size-fits-all.\""
        ],
        readTime: "15 min",
        importance: 9
      },
      {
        id: 3,
        title: "Storage and Retrieval",
        summary: "Explains database internals, focusing on data structures like B-Trees and LSM-Trees. Contrasts OLTP (transaction processing) vs OLAP (analytics). Also introduces concepts like columnar storage and materialized views that influence performance and scalability.",
        bulletPoints: [
          "B-Trees offer balanced read/write performance for OLTP workloads.",
          "LSM-Trees excel at high write throughput and compaction.",
          "Column-oriented storage is ideal for analytical queries.",
          "Indexing choices dramatically impact performance and efficiency."
        ],
        quotes: [
          "\"On the most fundamental level, a database needs to do two things: store the data, and give it back to you.\"",
          "\"There is a big difference between engines optimized for transactional workloads and those optimized for analytics.\""
        ],
        readTime: "17 min",
        importance: 10
      },
      {
        id: 4,
        title: "Encoding and Evolution",
        summary: "Focuses on data serialization formats (e.g., JSON, Avro, Thrift) and schema evolution. Compares language-specific vs language-neutral encodings. Emphasizes importance of backward/forward compatibility and communication via REST, RPC, or messaging.",
        bulletPoints: [
          "Schema evolution is vital for long-term maintainability.",
          "Binary formats like Avro and Protobuf offer compact and fast serialization.",
          "REST/RPC vs messaging defines dataflow style between services.",
          "Compatibility across schema versions avoids deployment pain."
        ],
        quotes: [
          "\"Whenever you want to send some data to another process with which you don’t share memory... you need to encode it as a sequence of bytes.\"",
          "\"Schema evolution allows the same kind of flexibility as schemaless JSON databases provide, while also offering better tooling.\""
        ],
        readTime: "14 min",
        importance: 8
      },
      {
        id: 5,
        title: "Replication",
        summary: "Covers replication strategies (single-leader, multi-leader, leaderless) and their effects on availability and consistency. Discusses replication lag, quorum reads/writes, and handling conflicts in distributed writes.",
        bulletPoints: [
          "Single-leader is simplest but struggles with failover and network partitions.",
          "Multi-leader handles wider writes but complicates conflict resolution.",
          "Leaderless models (e.g., Cassandra) use quorum reads/writes.",
          "Replication lag can lead to anomalies like stale reads or lost updates."
        ],
        quotes: [
          "\"Replication can serve several purposes: high availability, disconnected operation, latency, and scalability.\"",
          "\"Despite being a simple goal, replication turns out to be a remarkably tricky problem.\""
        ],
        readTime: "16 min",
        importance: 10
      },
      {
        id: 6,
        title: "Partitioning",
        summary: "Explores horizontal partitioning (sharding) to scale databases. Discusses key range vs hash partitioning, rebalancing techniques, index partitioning, and routing queries efficiently to the correct node.",
        bulletPoints: [
          "Range-based partitioning supports efficient queries, risks uneven load.",
          "Hash-based partitioning balances load but limits range scans.",
          "Rebalancing strategies: manual, dynamic, or consistent hashing.",
          "Routing layers and secondary index partitioning impact query paths."
        ],
        quotes: [
          "\"The main reason for wanting to partition data is scalability.\"",
          "\"A partition with disproportionately high load is called a hot spot.\""
        ],
        readTime: "15 min",
        importance: 9
      },
      {
        id: 7,
        title: "Transactions",
        summary: "Dissects ACID properties and isolation levels. Explains anomalies like lost updates, write skew, and phantom reads. Covers concurrency control techniques like MVCC, 2PL, and Serializable Snapshot Isolation.",
        bulletPoints: [
          "Read committed, snapshot isolation, and serializable are common levels.",
          "MVCC enables non-blocking reads by tracking version history.",
          "Write conflicts can be managed via locking or optimistic checks.",
          "Serializable Snapshot Isolation (SSI) balances safety and performance."
        ],
        quotes: [
          "\"Transactions reduce a large class of errors to a simple retry.\"",
          "\"Only serializable isolation protects against all concurrency issues.\""
        ],
        readTime: "16 min",
        importance: 10
      },
      {
        id: 8,
        title: "The Trouble with Distributed Systems",
        summary: "Explores the unique difficulties of distributed systems, including partial failures, unreliable clocks, and non-deterministic latency. Encourages designing systems to expect and gracefully handle such unpredictability.",
        bulletPoints: [
          "Network partitions, clock skew, and GC pauses are hard to detect reliably.",
          "Timeouts are an imperfect but necessary fallback.",
          "Monotonic clocks and vector clocks aid in event ordering.",
          "Design must embrace rather than mask distributed unreliability."
        ],
        quotes: [
          "\"The defining characteristic of distributed systems is partial failure.\"",
          "\"There is no global variable, no shared memory, and no common knowledge.\""
        ],
        readTime: "14 min",
        importance: 10
      },
      {
        id: 9,
        title: "Consistency and Consensus",
        summary: "Defines consistency models (linearizability, eventual consistency, causal ordering) and consensus mechanisms (Paxos, Raft). Explains how coordination is central to achieving correct distributed behavior.",
        bulletPoints: [
          "Linearizability provides strong guarantees, but has performance trade-offs.",
          "Consensus protocols like Raft and Paxos help with leader election, commits.",
          "CAP theorem: systems must trade off availability, consistency, and partition tolerance.",
          "ZooKeeper and etcd offer reusable consensus primitives."
        ],
        quotes: [
          "\"Linearizability makes a system act like a single copy of data.\"",
          "\"Consensus is required to achieve a single agreed-upon result in a distributed system.\""
        ],
        readTime: "18 min",
        importance: 10
      },
      {
        id: 10,
        title: "Batch Processing",
        summary: "Covers batch data pipelines using MapReduce, Hadoop, and DAG-based tools like Spark. Shows how data is partitioned, joined, grouped, and reduced in bulk workflows, emphasizing durability and fault tolerance.",
        bulletPoints: [
          "MapReduce remains the foundation of many batch systems.",
          "Spark and similar tools use high-level DAGs to optimize execution.",
          "Batch joins, aggregations, and grouping depend on data locality.",
          "Materializing intermediate states boosts efficiency and fault tolerance."
        ],
        quotes: [
          "\"Batch processing is fundamentally about transforming large amounts of data from one form to another.\"",
          "\"The Unix philosophy—building complex workflows out of simple tools—carries over to MapReduce and beyond.\""
        ],
        readTime: "15 min",
        importance: 8
      },
      {
        id: 11,
        title: "Stream Processing",
        summary: "Focuses on processing infinite event streams in real time. Contrasts with batch systems and covers streaming joins, windowing, fault-tolerant state, and stream-table duality. Describes how systems like Kafka and Flink power near-real-time analytics.",
        bulletPoints: [
          "Kafka, Pulsar, and similar tools provide replayable, partitioned logs.",
          "Event sourcing and Change Data Capture (CDC) produce real-time feeds.",
          "Windowed aggregations and joins are core stream operations.",
          "Stateful processing and checkpointing are essential for correctness."
        ],
        quotes: [
          "\"The one crucial difference to batch jobs is that a stream never ends.\"",
          "\"Stream processing is not inherently approximate—probabilistic algorithms are an optimization, not a requirement.\""
        ],
        readTime: "17 min",
        importance: 9
      },
      {
        id: 12,
        title: "The Future of Data Systems",
        summary: "Envisions data systems composed of modular, composable services linked by streams. Highlights derived data, observability, and ethical issues like privacy, correctness, and trust. Calls for responsible, human-centered system design.",
        bulletPoints: [
          "Derived data pipelines (views, indexes, ML models) will dominate future architectures.",
          "Composable stream processors replace monolithic databases.",
          "Evolvability depends on asynchronous, idempotent, well-bounded systems.",
          "Developers must consider ethical implications: surveillance, privacy, and manipulation."
        ],
        quotes: [
          "\"Applications are increasingly composed of dataflows that unbundle the components of a database.\"",
          "\"We should stop regarding users as metrics to be optimized, and remember that they are humans who deserve respect, dignity, and agency.\""
        ],
        readTime: "18 min",
        importance: 9
      }
    ]
  },
  {
    "id": 3,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "description": "A handbook of agile software craftsmanship, teaching principles and patterns for writing clean, readable, and maintainable code.",
    "totalReadTime": "195 min",
    "rating": 4.8,
    "chapters": [
      {
        "id": 1,
        "title": "Clean Code",
        "summary": "Introduces the definition of 'clean code' and the mindset needed to write it. Highlights the cost of bad code and the benefits of continuous code hygiene.",
        "bulletPoints": [
          "Clean code reads like well-written prose.",
          "Bad code increases long-term project cost and slows development.",
          "We are authors, and readability is key.",
          "Attitude towards quality directly affects codebase health."
        ],
        "quotes": [
          "\"Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.\"",
          "\"You are reading code more often than writing it—make it readable.\""
        ],
        "readTime": "12 min",
        "importance": 10
      },
      {
        "id": 2,
        "title": "Meaningful Names",
        "summary": "Details guidelines for naming variables, classes, and functions meaningfully. Encourages using intention-revealing, pronounceable, and searchable names.",
        "bulletPoints": [
          "Avoid disinformation and redundant prefixes.",
          "Use intention-revealing, domain-specific vocabulary.",
          "Don’t encode type or scope into names (e.g., Hungarian notation).",
          "Prefer consistency and avoid clever or pun-based names."
        ],
        "quotes": [
          "\"Names are everywhere in software. We name our variables, our functions, our arguments, classes, and packages.\"",
          "\"The name should answer all the big questions. It should tell you why it exists, what it does, and how it is used.\""
        ],
        "readTime": "14 min",
        "importance": 9
      },
      {
        "id": 3,
        "title": "Functions",
        "summary": "Explores how to write clean, small, and focused functions. Discusses principles like the Single Responsibility Principle and command-query separation.",
        "bulletPoints": [
          "Functions should be small and do one thing only.",
          "Avoid side effects and large parameter lists.",
          "Descriptive names and proper abstraction levels are critical.",
          "Use exceptions instead of error codes for cleaner logic."
        ],
        "quotes": [
          "\"Functions should do one thing. They should do it well. They should do it only.\"",
          "\"Short functions with descriptive names enhance readability and maintainability.\""
        ],
        "readTime": "16 min",
        "importance": 10
      },
      {
        "id": 4,
        "title": "Comments",
        "summary": "Comments should be used to explain why, not what. They are not a substitute for clear code and should be used sparingly and meaningfully.",
        "bulletPoints": [
          "Avoid redundant, misleading, or outdated comments.",
          "Prefer self-explanatory code to explanatory comments.",
          "Use comments to clarify intent, warn of consequences, or explain rationale.",
          "Delete commented-out code and avoid noise comments."
        ],
        "quotes": [
          "\"Don’t comment bad code—rewrite it.\"",
          "\"Comments are always failures. We must have them because we cannot always figure out how to express ourselves without them.\""
        ],
        "readTime": "14 min",
        "importance": 9
      },
      {
        "id": 5,
        "title": "Formatting",
        "summary": "Discusses the importance of consistent code formatting to enhance readability. Introduces vertical and horizontal formatting rules.",
        "bulletPoints": [
          "Code should be read like a newspaper, top-down.",
          "Vertical spacing reveals structure; horizontal spacing improves clarity.",
          "Team consistency in formatting is crucial.",
          "Avoid horizontal alignment unless it improves clarity."
        ],
        "quotes": [
          "\"Code formatting is about communication and clarity, not aesthetics.\"",
          "\"The purpose of formatting is to make code readable, not to express personal style.\""
        ],
        "readTime": "13 min",
        "importance": 8
      },
      {
        "id": 6,
        "title": "Objects and Data Structures",
        "summary": "Discusses the difference between objects and data structures. Promotes data hiding and emphasizes designing APIs around behaviors, not just exposing data.",
        "bulletPoints": [
          "Objects hide implementation; data structures expose it.",
          "Law of Demeter: minimize knowledge of other components.",
          "Design for behavior, not just data access.",
          "Use Data Transfer Objects (DTOs) sparingly and purposefully."
        ],
        "quotes": [
          "\"Objects hide their data behind abstractions and expose functions that operate on that data.\"",
          "\"Data structures expose their data and have no meaningful functions.\""
        ],
        "readTime": "13 min",
        "importance": 9
      },
      {
        "id": 7,
        "title": "Error Handling",
        "summary": "Explores robust error handling using exceptions. Encourages defining domain-specific exceptions and separating error-handling logic from core logic.",
        "bulletPoints": [
          "Prefer exceptions to return codes.",
          "Use unchecked exceptions for better flow.",
          "Fail fast, log meaningfully, and cleanly propagate errors.",
          "Define clear boundaries for exception handling."
        ],
        "quotes": [
          "\"Clean code is readable, but also robust and handles failure gracefully.\"",
          "\"Use try/catch blocks to separate error handling from business logic.\""
        ],
        "readTime": "14 min",
        "importance": 9
      },
      {
        "id": 8,
        "title": "Boundaries",
        "summary": "Addresses managing boundaries between systems or components. Discusses using third-party code cautiously and wrapping it with your own abstractions.",
        "bulletPoints": [
          "Limit dependencies on external libraries.",
          "Use anti-corruption layers to isolate changes.",
          "Build tests around interface boundaries.",
          "Use your own interfaces over third-party APIs."
        ],
        "quotes": [
          "\"Boundaries are dangerous places where errors happen.\"",
          "\"Wrap third-party APIs so they can be replaced easily.\""
        ],
        "readTime": "13 min",
        "importance": 8
      },
      {
        "id": 9,
        "title": "Unit Tests",
        "summary": "Emphasizes the importance of unit tests in clean code. Defines characteristics of clean tests: fast, independent, repeatable, self-validating, and timely.",
        "bulletPoints": [
          "Tests must be F.I.R.S.T.: Fast, Independent, Repeatable, Self-validating, Timely.",
          "Test behavior, not implementation.",
          "Tests should be as clean as production code.",
          "Good tests enable safe refactoring."
        ],
        "quotes": [
          "\"A clean test suite is your first line of defense against messy code.\"",
          "\"Code without tests is not clean. It's not even code.\""
        ],
        "readTime": "15 min",
        "importance": 10
      },
      {
        "id": 10,
        "title": "Classes",
        "summary": "Explains how to structure classes with high cohesion and low coupling. Promotes the Single Responsibility Principle and encapsulation.",
        "bulletPoints": [
          "Classes should be small and focused.",
          "Follow the Single Responsibility Principle (SRP).",
          "Keep classes organized and logically structured.",
          "Prefer composition over inheritance when appropriate."
        ],
        "quotes": [
          "\"A class should represent a single concept or abstraction.\"",
          "\"When a class has more than one reason to change, it has more than one responsibility.\""
        ],
        "readTime": "13 min",
        "importance": 9
      },
      {
        "id": 11,
        "title": "Systems",
        "summary": "Discusses system architecture and integration, emphasizing separation of concerns and dependency injection for flexibility and testability.",
        "bulletPoints": [
          "Separate construction from use (dependency injection).",
          "Use factories to manage object creation.",
          "Keep system components decoupled and testable.",
          "Minimize startup and configuration entanglement."
        ],
        "quotes": [
          "\"A system is a story about communication and collaboration between its components.\"",
          "\"Don’t let high-level policies depend on low-level details.\""
        ],
        "readTime": "14 min",
        "importance": 8
      },
      {
        "id": 12,
        "title": "Emergence",
        "summary": "Details how clean code emerges through adherence to simple design rules: passes tests, reveals intent, has no duplication, and minimizes entities.",
        "bulletPoints": [
          "Make code pass all tests.",
          "Express intent clearly through naming and structure.",
          "Eliminate duplication aggressively.",
          "Keep code small and simple."
        ],
        "quotes": [
          "\"Simple design leads to emergent quality in code.\"",
          "\"Duplication is the root of all evil in software.\""
        ],
        "readTime": "12 min",
        "importance": 8
      },
      {
        "id": 13,
        "title": "Concurrency",
        "summary": "Explains how to write clean concurrent code. Discusses race conditions, immutability, and using concurrency libraries safely.",
        "bulletPoints": [
          "Avoid shared mutable state.",
          "Use synchronization primitives judiciously.",
          "Prefer task-based concurrency to thread management.",
          "Write tests to expose concurrency issues."
        ],
        "quotes": [
          "\"Concurrency bugs are some of the hardest to find and reproduce.\"",
          "\"Clean concurrent code is structured, predictable, and safe.\""
        ],
        "readTime": "16 min",
        "importance": 9
      },
      {
        "id": 14,
        "title": "Successive Refinement",
        "summary": "Presents a real example of iterative code cleanup. Shows the process of refining code in stages to make it cleaner and clearer.",
        "bulletPoints": [
          "Refactor code in small, safe steps.",
          "Prioritize readability and maintainability.",
          "Remove duplication and clarify logic.",
          "Use good judgment and testing during refinement."
        ],
        "quotes": [
          "\"Refactoring is a disciplined technique for improving the design of existing code.\"",
          "\"Every small cleanup makes the code a bit better and easier to evolve.\""
        ],
        "readTime": "13 min",
        "importance": 8
      },
      {
        "id": 15,
        "title": "JUnit Internals",
        "summary": "Explores the internals of JUnit to demonstrate real-world code improvement. Focuses on test structure and behavior.",
        "bulletPoints": [
          "Use real projects to practice cleanup techniques.",
          "Internal code often needs just as much care as public APIs.",
          "Understand before refactoring.",
          "Leverage tests to drive refactoring safely."
        ],
        "quotes": [
          "\"The internal quality of test frameworks impacts every project that uses them.\"",
          "\"Tackle complexity with tests and careful decomposition.\""
        ],
        "readTime": "14 min",
        "importance": 7
      },
      {
        "id": 16,
        "title": "Refactoring SerialDate",
        "summary": "A deep-dive case study of refactoring a date-handling class. Shows how to identify design smells and gradually improve design and clarity.",
        "bulletPoints": [
          "Refactoring improves code structure without changing behavior.",
          "Look for long methods, duplication, and bad abstractions.",
          "Small, frequent changes reduce risk.",
          "Document motivations and results of each step."
        ],
        "quotes": [
          "\"You can’t clean a codebase in one pass—it takes repeated effort.\"",
          "\"Good refactoring leaves the code stronger and more understandable.\""
        ],
        "readTime": "18 min",
        "importance": 9
      },
      {
        "id": 17,
        "title": "Smells and Heuristics",
        "summary": "Compiles a list of code smells and practical heuristics discovered while cleaning up earlier examples. Serves as a reference guide for diagnosing and improving code.",
        "bulletPoints": [
          "Smells signal deeper design issues (e.g., long functions, duplicate code).",
          "Heuristics guide decisions on naming, structure, and readability.",
          "Use smells and heuristics as prompts for refactoring.",
          "Coding style must support communication, not personal expression."
        ],
        "quotes": [
          "\"A smell is a surface indication that usually corresponds to a deeper problem in the system.\"",
          "\"Heuristics are rules of thumb that help us evaluate and improve code quality.\""
        ],
        "readTime": "18 min",
        "importance": 10
      }
    ]
  },
  {
    "id": 7,
    "title": "The Design of Everyday Things",
    "author": "Don Norman",
    "description": "A foundational book on user-centered design, examining how well-designed objects and interfaces empower users and how poor design can lead to errors and frustration. Revised and expanded for a modern audience.",
    "totalReadTime": "190 min",
    "rating": 4.8,
    "chapters": [
      {
        "id": 1,
        "title": "The Psychopathology of Everyday Things",
        "summary": "This chapter explores why common objects often confuse users, tracing the issue to poor design rather than user error. Norman introduces key design concepts such as affordances (what actions are possible), signifiers (what signals those possibilities), feedback, and mental models. He criticizes modern technology’s tendency to overload users with options and obscure interfaces. The chapter advocates human-centered design, which prioritizes usability by aligning product behavior with user expectations and needs. It outlines how small design flaws—like ambiguous door handles or unclear control panels—can cause confusion, accidents, and frustration.",
        "bulletPoints": [
          "Affordances define what actions are possible; signifiers clarify them.",
          "Poorly designed everyday objects shift blame from designer to user.",
          "Discoverability and feedback are key to intuitive interaction.",
          "Good design is invisible; bad design calls attention to itself."
        ],
        "quotes": [
          "\"Design is really an act of communication, which means having a deep understanding of the person with whom the designer is communicating.\"",
          "\"The problem with the designs of everyday things is that they are often poorly designed for people’s capabilities.\""
        ],
        "readTime": "15 min",
        "importance": 5
      },
      {
        "id": 2,
        "title": "The Psychology of Everyday Actions",
        "summary": "Norman outlines how human psychology influences interaction with objects, introducing the seven stages of action: goal, plan, specify, perform, perceive, interpret, and compare. He discusses the 'Gulf of Execution' (gap between user's goal and system's mechanisms) and the 'Gulf of Evaluation' (difficulty assessing the outcome). Norman emphasizes that errors result not from user incompetence but from design that fails to support human cognition. He explains how memory limitations and reliance on context affect action, advocating for designs that guide users through clear signposting and meaningful constraints.",
        "bulletPoints": [
          "People interact in a cycle of goal formation, execution, and evaluation.",
          "Designs must minimize execution and evaluation gulfs.",
          "Designs should guide users via feedback, constraints, and natural mappings.",
          "Understanding human cognition is essential for error-resilient design."
        ],
        "quotes": [
          "\"Designers expect users to behave logically, but people are emotional and make mistakes.\"",
          "\"Eliminate all error messages; instead, provide help and guidance.\""
        ],
        "readTime": "17 min",
        "importance": 4
      },
      {
        "id": 3,
        "title": "Knowledge in the Head and in the World",
        "summary": "This chapter distinguishes between internal knowledge (in the user's head) and external knowledge (in the world or interface). Norman emphasizes designing systems that reduce reliance on memory by leveraging physical cues and contextual information. He discusses how natural mappings (e.g. stove knobs laid out like burners) make interactions more intuitive. Different types of constraints—physical, semantic, cultural, and logical—aid user comprehension and prevent errors. The core message is to design interfaces that make options visible, choices understandable, and actions reversible.",
        "bulletPoints": [
          "External cues reduce cognitive load on users.",
          "Natural mappings align controls with expected outcomes.",
          "Constraints shape user behavior and reduce error likelihood.",
          "Design should reflect user expectations and cultural norms."
        ],
        "quotes": [
          "\"Designers can put knowledge into the world to ease users' cognitive load.\"",
          "\"Natural mapping uses spatial correspondences to help understanding.\""
        ],
        "readTime": "16 min",
        "importance": 4
      },
      {
        "id": 4,
        "title": "Knowing What to Do: Constraints, Discoverability, and Feedback",
        "summary": "Norman explains how users figure out how to use a product: through constraints, signifiers, and feedback. He defines four types of constraints—physical (what is possible), semantic (based on meaning), cultural (socially learned norms), and logical (inference-based). These constraints guide user behavior and help eliminate errors. Discoverability—the ability to understand what actions are possible—depends on good design that signals affordances. Feedback is critical: users must know their actions had the desired effect. Norman urges designers to test assumptions and prioritize clarity and recovery over control.",
        "bulletPoints": [
          "Discoverability arises from visible signifiers and natural constraints.",
          "Feedback must be immediate, visible, and helpful.",
          "Design must accommodate different user contexts and expectations.",
          "Usability testing reveals hidden barriers to intuitive use."
        ],
        "quotes": [
          "\"Without feedback, we are left guessing what happened.\"",
          "\"Design is an iterative process of refining solutions.\""
        ],
        "readTime": "16 min",
        "importance": 4
      },
      {
        "id": 5,
        "title": "Human Error? No, Bad Design",
        "summary": "This chapter argues that what’s often called 'human error' is actually a result of bad design. Norman classifies slips (execution errors) and mistakes (goal errors), and examines how poor interface design can cause fatal consequences—especially in complex systems like healthcare and aviation. He proposes design strategies to reduce errors: include redundancy, use sensible defaults, support undo, and highlight critical actions. Good systems support human strengths while compensating for weaknesses. Blame should fall on design flaws, not users who operate within confusing or unforgiving interfaces.",
        "bulletPoints": [
          "Errors are categorized as slips (doing wrong) and mistakes (choosing wrong).",
          "Design should prevent, detect, and recover from errors.",
          "Systems should allow undoing actions and provide clear feedback.",
          "Blaming users ignores the role of poor design in facilitating failure."
        ],
        "quotes": [
          "\"Blame the design, not the user.\"",
          "\"Even experts make errors—design must accommodate this reality.\""
        ],
        "readTime": "18 min",
        "importance": 5
      },
      {
        "id": 6,
        "title": "Design Thinking",
        "summary": "This chapter introduces the Human-Centered Design (HCD) process, a structured, iterative approach to problem-solving that places users at the center of the design cycle. Norman outlines the double-diamond model—divergent and convergent thinking to define problems and solutions. He emphasizes prototyping and iterative testing as key to discovering user needs and refining designs. Designers should frame the right problem before jumping to solutions. The chapter warns against over-simplification and highlights the difference between accommodating complexity and causing confusion.",
        "bulletPoints": [
          "Design thinking follows an iterative, user-centered process.",
          "Double-diamond model: discover problems, define scope, develop, and deliver.",
          "Design is about exploring the problem space before solving it.",
          "Prototypes and user feedback refine both ideas and understanding."
        ],
        "quotes": [
          "\"Designers must frame the problem correctly before solving it.\"",
          "\"Complexity is good; confusion is bad.\""
        ],
        "readTime": "17 min",
        "importance": 5
      },
      {
        "id": 7,
        "title": "Design in the World of Business",
        "summary": "Norman explains how design fits into business objectives, showing that success depends not just on usability but on market viability, aesthetics, and strategic alignment. He compares incremental innovation (small improvements) with radical innovation (transformative change). The chapter discusses the organizational barriers to good design, including siloed departments and resistance to change. Norman stresses that successful product development requires collaboration across disciplines and alignment of goals from engineering to marketing.",
        "bulletPoints": [
          "Design must consider technical feasibility, user desirability, and business viability.",
          "Incremental changes are more common and less risky than radical innovation.",
          "Cross-functional collaboration improves design success.",
          "Good design is strategic, not just aesthetic."
        ],
        "quotes": [
          "\"Designers must understand business constraints and vice versa.\"",
          "\"Incremental changes dominate innovation; radical shifts are risky and rare.\""
        ],
        "readTime": "18 min",
        "importance": 3
      },
      {
        "id": 8,
        "title": "The Design of Everyday Things: 1988–2038",
        "summary": "In this reflective final chapter, Norman looks back on the original 1988 edition of the book and forward to the future of design. He stresses that while technology has evolved rapidly, human behavior and psychology remain largely constant. Designers must prioritize human needs even as digital, AI-driven, and networked technologies advance. The chapter underscores enduring design principles—clarity, usability, and feedback—as timeless. Norman anticipates that storytelling, communication, and human empathy will remain central to meaningful product design in the decades to come.",
        "bulletPoints": [
          "Design must evolve with technology while grounding in human needs.",
          "Core psychological principles endure despite technological change.",
          "Future design must consider ethics, privacy, and user empowerment.",
          "Empathy and storytelling are central to human-centered design."
        ],
        "quotes": [
          "\"The more things change, the more they are the same.\"",
          "\"Technology changes, but human psychology does not.\""
        ],
        "readTime": "14 min",
        "importance": 3
      }
    ]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  
  const filteredBooks = sampleBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedBook) {
    return <BookView book={selectedBook} onBack={() => setSelectedBook(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-blue-100 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900">
      <ThemeToggle />
      
      {/* Background texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none dark:opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-700 dark:text-slate-200 mb-4 drop-shadow-sm">
            📚 swe scroll
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 italic">
            "Wisdom flows gently like a quiet stream"
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-slate-400 dark:from-blue-400 dark:to-slate-500 mx-auto mb-8 rounded-full"></div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search wisdom... (title, author, or topic)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-slate-200 dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:border-blue-300 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-400/20 shadow-sm text-slate-700 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <Card 
              key={book.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-850 border border-slate-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
              onClick={() => setSelectedBook(book)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Book className="h-8 w-8 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <Star className="h-4 w-4 fill-current mr-1 text-blue-400" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  {book.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 font-medium">
                  by {book.author}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{book.totalReadTime}</span>
                  </div>
                  <span className="font-medium">
                    {book.chapters.length} chapter{book.chapters.length > 1 ? 's' : ''}
                  </span>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-slate-500 dark:from-blue-600 dark:to-slate-600 hover:from-blue-600 hover:to-slate-600 dark:hover:from-blue-700 dark:hover:to-slate-700 text-white font-semibold py-2 rounded-lg shadow-sm transform transition-all duration-200 group-hover:scale-105">
                  Begin Reading
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <Book className="h-24 w-24 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-2">No books found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Your search for "{searchTerm}" yielded no results. Try different terms.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t border-slate-200 dark:border-gray-700">
          <p className="text-slate-600 dark:text-slate-400 italic">
            "A room without books is like a body without a soul" - Cicero
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
