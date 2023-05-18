"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fixedOrder = ["react", "prop-types"];
function default_1(styleApi, file) {
    const { alias, and, not, dotSegmentCount, hasNoMember, isAbsoluteModule, isNodeModule, isInstalledModule, isRelativeModule, moduleName, naturally, unicode } = styleApi;
    const isReactModule = imported => Boolean(imported.moduleName.match(/^(react|prop-types|redux)/));
    const isStylesModule = imported => Boolean(imported.moduleName.match(/\.s?css$/));
    const reactComparator = (name1, name2) => {
        let i1 = fixedOrder.indexOf(name1);
        let i2 = fixedOrder.indexOf(name2);
        i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
        i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;
        return i1 === i2 ? naturally(name1, name2) : i1 - i2;
    };
    return [
        // import "foo"
        { match: and(hasNoMember, isAbsoluteModule) },
        { separator: true },
        // import "./foo"
        { match: and(hasNoMember, isRelativeModule, not(isStylesModule)) },
        { separator: true },
        // import React from "react";
        {
            match: isReactModule,
            sort: moduleName(reactComparator),
            sortNamedMembers: alias(unicode)
        },
        // import … from "fs";
        {
            match: isNodeModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode)
        },
        // import uniq from 'lodash/uniq';
        {
            match: isInstalledModule(path_1.dirname(file)),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode)
        },
        { separator: true },
        // import Component from "components/Component.jsx";
        {
            match: isAbsoluteModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode)
        },
        { separator: true },
        // import … from "./foo";
        // import … from "../foo";
        {
            match: and(isRelativeModule, not(isStylesModule)),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode)
        },
        { separator: true },
        // import "./styles.css";
        { match: and(hasNoMember, isRelativeModule, isStylesModule) },
        // import styles from "./Components.scss";
        {
            match: isStylesModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode)
        },
        { separator: true }
    ];
}
exports.default = default_1;
